#!/usr/bin/env python3
"""Capture docs screenshots from screenshots/shots.json and upload them to S3.

See screenshots/README.md for setup, the manifest format, and usage.
"""

from __future__ import annotations

import json
import os
import pathlib
import re
import subprocess
import sys
import tempfile
from dataclasses import dataclass
from urllib.parse import urlparse

REPO_ROOT = pathlib.Path(__file__).resolve().parents[1]

DEFAULT_ENV_FILE = ".env"
DEFAULT_SHOTS_FILE = "screenshots/shots.json"
DEFAULT_AUTH_FILE = "auth.json"
SCREENSHOT_WAIT_MS = "2000"
CLICKABLE_SELECTOR = 'button,[role="tab"],a,[role="button"],div,span,li'
SELECTOR_WAIT_MS = 15000
SETTLE_MS = 400
UNRESOLVED_TOKEN = re.compile(r":[A-Za-z]\w*")


@dataclass(frozen=True)
class Shot:
    s3_key: str
    path: str
    selector: str = ""
    full_page: bool = False
    click: tuple[str, ...] = ()
    hide: str = ""
    width: int = 0
    height: int = 0
    doc: str = ""
    local_storage: tuple[tuple[str, str], ...] = ()

    @classmethod
    def from_dict(cls, raw: dict) -> "Shot":
        text_fields = ("s3_key", "path", "selector", "hide", "doc")
        values = {name: raw.get(name, "") for name in text_fields}
        values["full_page"] = bool(raw.get("full_page", False))
        values["width"] = int(raw.get("width") or 0)
        values["height"] = int(raw.get("height") or 0)
        click = raw.get("click")
        values["click"] = tuple(click) if isinstance(click, list) else (click,) if click else ()
        store = raw.get("local_storage") or {}
        values["local_storage"] = (
            tuple((str(k), str(v)) for k, v in store.items()) if isinstance(store, dict) else ()
        )
        return cls(**values)

    @property
    def label(self) -> str:
        return self.s3_key or self.path or "<unnamed shot>"

    def missing_field(self) -> str | None:
        for name in ("s3_key", "path"):
            if not getattr(self, name):
                return name
        return None


@dataclass(frozen=True)
class Settings:
    base_url: str
    bucket: str
    tokens: dict[str, str]
    auth_file: str
    shots_file: pathlib.Path
    only_prefix: str
    dry_run: bool
    out_dir: pathlib.Path | None


class ShotError(Exception):
    pass


def load_dotenv(path: pathlib.Path) -> None:
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, _, value = line.partition("=")
        os.environ.setdefault(key.strip(), value.strip().strip("\"'"))


def require_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        sys.exit(f"error: missing required environment variable: {name}")
    return value


def load_settings() -> Settings:
    tokens = {":projectId": require_env("CONFIDENT_PROJECT_ID")}
    connection_id = os.environ.get("CONFIDENT_AI_CONNECTION_ID", "").strip()
    if connection_id:
        tokens[":aiConnectionId"] = connection_id
    annotation_form_id = os.environ.get("CONFIDENT_ANNOTATION_FORM_ID", "").strip()
    if annotation_form_id:
        tokens[":annotationFormId"] = annotation_form_id
    test_run_id = os.environ.get("CONFIDENT_TEST_RUN_ID", "").strip()
    if test_run_id:
        tokens[":testRunId"] = test_run_id

    return Settings(
        base_url=require_env("PLATFORM_BASE_URL").rstrip("/"),
        bucket=require_env("S3_BUCKET"),
        tokens=tokens,
        auth_file=os.environ.get("SHOTSCRAPER_AUTH_FILE", DEFAULT_AUTH_FILE),
        shots_file=REPO_ROOT / os.environ.get("SHOTS_FILE", DEFAULT_SHOTS_FILE),
        only_prefix=os.environ.get("ONLY_PATH_PREFIX", ""),
        dry_run=os.environ.get("DRY_RUN") == "1",
        out_dir=pathlib.Path(out_env) if (out_env := os.environ.get("OUT_DIR", "").strip()) else None,
    )


def load_shots(shots_file: pathlib.Path) -> list[Shot]:
    if not shots_file.exists():
        sys.exit(f"error: manifest not found: {shots_file}")
    try:
        data = json.loads(shots_file.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        sys.exit(f"error: invalid JSON in {shots_file}: {exc}")

    if isinstance(data, dict):
        raw_shots = data.get("shots", [])
        defaults = data.get("local_storage") or {}
    else:
        raw_shots, defaults = data, {}
    if not isinstance(raw_shots, list):
        sys.exit(f'error: {shots_file} must be a list (or {{"shots": [...]}})')

    shots = []
    for item in raw_shots:
        if defaults:
            item = {**item, "local_storage": {**defaults, **(item.get("local_storage") or {})}}
        shots.append(Shot.from_dict(item))
    return shots


def _click_js(click: str) -> str:
    if not click:
        return ""
    if click[0] in "[.#":
        sel = json.dumps(click)
        return (
            f"{{ const el = document.querySelector({sel});"
            f" if (!el) throw new Error('click target not found: ' + {sel});"
            " el.click(); }"
        )
    target = json.dumps(click)
    return (
        f"{{ const t = {target};"
        f" const m = [...document.querySelectorAll({json.dumps(CLICKABLE_SELECTOR)})]"
        f".filter(el => el.textContent.trim() === t);"
        " const el = m.find(o => !m.some(x => x !== o && o.contains(x))) || m[0];"
        f" if (!el) throw new Error('click text not found: ' + {target});"
        " el.click(); }"
    )


def _settle_js(ms: int) -> str:
    return f" await new Promise(r => setTimeout(r, {ms}));"


def _wait_for_js(selector: str) -> str:
    if not selector:
        return ""
    sel = json.dumps(selector)
    return (
        "await new Promise(res => {"
        f" const sel = {sel}, start = Date.now();"
        " (function poll() {"
        "   const el = document.querySelector(sel);"
        "   if (el && el.getBoundingClientRect().height > 0) return res();"
        f"   if (Date.now() - start > {SELECTOR_WAIT_MS}) return res();"
        "   setTimeout(poll, 100);"
        " })();"
        "});"
        + _settle_js(SETTLE_MS)
    )


def _hide_js(hide: str) -> str:
    selectors = [s.strip() for s in hide.split(",") if s.strip()]
    return "".join(
        f"document.querySelectorAll({json.dumps(sel)})"
        ".forEach(el => el.style.visibility = 'hidden');"
        for sel in selectors
    )


def browser_js(shot: Shot) -> str:
    clicks = "".join(_click_js(c) + _settle_js(SETTLE_MS) for c in shot.click)
    body = clicks + _wait_for_js(shot.selector) + _hide_js(shot.hide)
    if not body.strip():
        return ""
    return f"(async () => {{ {body} }})()"


def run(cmd: list[str], error: str) -> None:
    if subprocess.run(cmd).returncode != 0:
        raise ShotError(error)


def _slug(s3_key: str) -> str:
    return re.sub(r"[^A-Za-z0-9]+", "_", s3_key)


def _apply_tokens(text: str, tokens: dict[str, str]) -> str:
    for token, value in tokens.items():
        text = text.replace(token, value)
    return text


def resolve_path(path: str, tokens: dict[str, str]) -> str:
    path = _apply_tokens(path, tokens)
    leftover = UNRESOLVED_TOKEN.search(path)
    if leftover:
        raise ShotError(
            f"unresolved path token '{leftover.group()}' "
            "(set the matching env var, e.g. CONFIDENT_AI_CONNECTION_ID)"
        )
    return path


def resolve_auth_file(shot: Shot, settings: Settings, out_dir: pathlib.Path) -> str | None:
    base_exists = os.path.exists(settings.auth_file)
    if not shot.local_storage:
        return settings.auth_file if base_exists else None

    state = {"cookies": [], "origins": []}
    if base_exists:
        state = json.loads(pathlib.Path(settings.auth_file).read_text(encoding="utf-8"))

    parsed = urlparse(settings.base_url)
    origin = f"{parsed.scheme}://{parsed.netloc}"
    origins = state.setdefault("origins", [])
    entry = next((o for o in origins if o.get("origin") == origin), None)
    if entry is None:
        entry = {"origin": origin, "localStorage": []}
        origins.append(entry)

    items = {pair["name"]: pair for pair in entry.setdefault("localStorage", [])}
    for name, value in shot.local_storage:
        name = _apply_tokens(name, settings.tokens)
        items[name] = {"name": name, "value": _apply_tokens(value, settings.tokens)}
    entry["localStorage"] = list(items.values())

    merged = out_dir / f".auth_{_slug(shot.s3_key)}.json"
    merged.write_text(json.dumps(state), encoding="utf-8")
    return str(merged)


def screenshot(shot: Shot, settings: Settings, out_dir: pathlib.Path) -> pathlib.Path:
    url = settings.base_url + resolve_path(shot.path, settings.tokens)
    output = out_dir / f"{_slug(shot.s3_key)}.png"

    cmd = [
        "shot-scraper", url,
        "--output", str(output),
        "--wait", SCREENSHOT_WAIT_MS,
        "--retina",
    ]
    if shot.selector and not shot.full_page:
        cmd += ["--selector", shot.selector]
    if shot.width:
        cmd += ["--width", str(shot.width)]
    if shot.height:
        cmd += ["--height", str(shot.height)]
    if auth_file := resolve_auth_file(shot, settings, out_dir):
        cmd += ["--auth", auth_file]
    if script := browser_js(shot):
        cmd += ["--javascript", script]

    print(f"capture {shot.label} -> {url}")
    run(cmd, "shot-scraper failed")
    return output


def upload(image: pathlib.Path, s3_key: str, settings: Settings) -> None:
    target = f"s3://{settings.bucket}/{s3_key}"
    if settings.dry_run:
        print(f"  [dry-run] would upload to {target}")
        return

    print(f"  upload {target}")
    run([
        "aws", "s3", "cp", str(image), target,
        "--content-type", "image/png",
        "--cache-control", "public, max-age=300",
    ], "upload failed")


def capture(shot: Shot, settings: Settings, out_dir: pathlib.Path) -> None:
    if missing := shot.missing_field():
        raise ShotError(f"missing '{missing}'")
    image = screenshot(shot, settings, out_dir)
    upload(image, shot.s3_key, settings)


def capture_all(shots: list[Shot], settings: Settings, out_dir: pathlib.Path) -> int:
    failures = 0
    for shot in shots:
        try:
            capture(shot, settings, out_dir)
        except ShotError as err:
            print(f"skip {shot.label}: {err}", file=sys.stderr)
            failures += 1
    return failures


def main() -> None:
    load_dotenv(REPO_ROOT / DEFAULT_ENV_FILE)
    settings = load_settings()
    shots = load_shots(settings.shots_file)
    if settings.only_prefix:
        shots = [s for s in shots if s.path.startswith(settings.only_prefix)]
    if not shots:
        sys.exit(f"no shots to capture in {settings.shots_file}")

    manifest = settings.shots_file.relative_to(REPO_ROOT)
    print(f"capturing {len(shots)} shot(s) from {manifest}")

    if settings.out_dir:
        settings.out_dir.mkdir(parents=True, exist_ok=True)
        failures = capture_all(shots, settings, settings.out_dir)
        print(f"screenshots saved to {settings.out_dir}")
    else:
        with tempfile.TemporaryDirectory() as tmp:
            failures = capture_all(shots, settings, pathlib.Path(tmp))

    if failures:
        sys.exit(f"completed with {failures} failure(s)")
    print("done")


if __name__ == "__main__":
    main()
