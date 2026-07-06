# Docs Screenshots

Automated, version-controlled screenshots of the Confident AI platform for the docs.

Every screenshot is **defined once** in [`shots.json`](./shots.json) and captured by
[`capture.py`](./capture.py). The script logs into the platform with a saved browser
session, crops to a specific UI element, and uploads the PNG to S3. Because the docs
reference each image by its **S3 key**, overwriting that object refreshes the live docs
with **no MDX or code changes**.

```
shots.json ──▶ capture.py ──▶ shot-scraper (headless Chromium) ──▶ S3 ──▶ live docs
   (specs)      (runner)         (login + crop + screenshot)      (overwrite)
```

> [!TIP]
> Adding or updating a screenshot is usually a **one-line edit to `shots.json`** plus a
> single command. You should not need to touch `capture.py`.

---

## TL;DR commands

```bash
# 0. one-time install
pip install shot-scraper awscli && shot-scraper install

# 1. one-time: configure (copy the template, then fill in the blanks)
cp .env.example .env

# 2. one-time: save a logged-in session (opens a real browser, log in, then press Enter)
shot-scraper auth https://app.confident-ai.com/auth/login auth.json

# 3. preview without uploading (writes PNGs to ./_shots for you to inspect)
DRY_RUN=1 python screenshots/capture.py

# 4. publish for real (uploads to S3)
python screenshots/capture.py
```

`capture.py` auto-loads `.env`, so every run is a single command. Real environment
variables always take precedence over `.env`, so the GitHub Action (which sets them
directly) is unaffected.

Prefer not to run anything locally? Trigger the **`screenshots`** GitHub Action instead —
see [Running in CI](#running-in-ci).

---

## Prerequisites

| Tool | Why | Install |
| --- | --- | --- |
| Python 3.10+ | runs `capture.py` | preinstalled on most systems |
| [`shot-scraper`](https://shot-scraper.datasette.io/) | headless browser screenshots | `pip install shot-scraper && shot-scraper install` |
| AWS CLI | uploads to S3 (only for real publishes, **not** dry runs) | `pip install awscli` |
| A logged-in `auth.json` | lets the headless browser see authenticated pages | `shot-scraper auth ...` (see below) |

---

## The manifest (`shots.json`)

A single JSON file holds every screenshot spec. Shape:

```json
{
  "local_storage": {
    "getting-started-open::projectId": "false",
    "dismissed-banner:book-a-demo-v1": "true"
  },
  "shots": [
    {
      "s3_key": "ai-connection:setup.png",
      "doc": "fern/docs/pages/settings/project/ai-connections.mdx",
      "path": "/project/:projectId/project-settings/ai-connections/:aiConnectionId",
      "selector": "[data-docs-id='ai-connection-editor']"
    }
  ]
}
```

The optional top-level **`local_storage`** object is a **default applied to every shot** (each shot's own `local_storage` is merged on top and wins). It's seeded before the page loads, so it's the place to put UI state every full-platform shot needs — e.g. collapsing the Getting Started dropdown (`getting-started-open:<projectId>` → `false`) and dismissing the "Book a demo" banner (`dismissed-banner:book-a-demo-v1` → `true`) so neither eats space in a hero shot. Keys **and** values support the same `:projectId` / `:aiConnectionId` tokens as `path`, so a project-scoped key is written `getting-started-open::projectId`.

| Field | Required | What it does |
| --- | --- | --- |
| `s3_key` | yes | The S3 object to overwrite. This is the **only** link between the docs image and this capture. |
| `path` | yes | Platform route to visit. May contain `:projectId` / `:aiConnectionId` / `:annotationFormId` / `:testRunId` tokens (filled from env). |
| `selector` | no | CSS selector of the element of interest. The shot always **waits for** this element to render before capturing, and—unless `full_page` is set—**crops** the image to it. |
| `full_page` | no | `true` = capture the whole browser window (global nav, top bar, content) instead of cropping to `selector`; the shot still waits for `selector` first. Omit/`false` = crop to `selector`. |
| `click` | no | Click before capturing — a CSS selector (`[ . #`) **or** the exact visible text of an element (e.g. a tab label like `"Output Parsing"`). Pass an **array** to run clicks in order, e.g. `["Body", "[data-docs-id='ai-connection-payload-mode']", "Code"]` to open a tab, then a dropdown, then an option. If a `click` matches **nothing**, the shot **fails loudly** (rather than silently capturing the wrong state) — check the label text and that the element is deployed. |
| `wait` | no | Extra milliseconds to wait **after** the `click`/`selector` before capturing. Use for panels whose content streams in after opening (e.g. a drawer that fetches its data on open) so the shot isn't captured mid-load. |
| `hide` | no | Comma-separated CSS selectors to visually hide (PII, avatars, CTAs, banners, noise). Note: this only sets `visibility: hidden`, so it leaves a blank gap. To actually collapse a widget, prefer `local_storage`. |
| `local_storage` | no | Object of `localStorage` key→value pairs seeded **before the page loads** (merged into the saved session that `--auth` restores). Use it to drive UI state the app reads from `localStorage` on mount — e.g. `"getting-started-open::projectId": "false"` to collapse the Getting Started dropdown and `"dismissed-banner:book-a-demo-v1": "true"` to drop the "Book a demo" banner. Keys and values are strings and support `:projectId` / `:aiConnectionId` tokens. Usually set once at the top level (see below) rather than per shot. |
| `width` | no | Viewport width in px (default `1280`). Mainly for `full_page` shots — set a clean window size (e.g. `1512`). |
| `height` | no | Viewport height in px. For a `full_page` shot this is the window height that gets captured, so tune it to fit the content (too tall = dark empty space, too short = cutoff). For a crop of a container that flex-fills the page (like `ai-connection-editor`) the image height ≈ `height − ~240` (the page header above the editor), independent of content. Omit for normal-sized elements. |
| `doc` | no | The MDX page that displays this image. Informational only — helps humans keep the manifest and docs in sync. |

### Two capture modes

Both modes use `selector` to point at the element of interest — `full_page` decides whether to crop to it or capture the whole window around it.

- **Element crop** (default): set `selector` to a `data-docs-id` anchor and the shot is cropped to that element — best for focused detail (a single tab, panel, or field).
- **Full platform**: set `selector` **and** `full_page: true`. The shot waits for `selector` to render, then captures the whole browser window — global nav, top bar, breadcrumbs, and content. Best for "where does this live" hero shots. Pair it with `width`/`height` (window size) and the top-level `local_storage` default (to collapse the Getting Started dropdown and drop the "Book a demo" banner so they leave no gap).

```json
{
  "s3_key": "ai-connection:full-platform.png",
  "path": "/project/:projectId/project-settings/ai-connections/:aiConnectionId",
  "selector": "[data-docs-id='ai-connection-editor']",
  "full_page": true,
  "width": 1512,
  "height": 945
}
```

### `selector` — use stable `data-docs-id` hooks

Screenshots crop to a CSS selector, so the platform UI needs **stable, deployment-proof
anchors**. We use a dedicated attribute, `data-docs-id`, in the `confident-cloud` frontend
(kept separate from `data-testid` so docs and tests never fight over selectors):

```tsx
<div className={styles.splitContainer} data-docs-id="ai-connection-editor">
```

Then in the manifest: `"selector": "[data-docs-id='ai-connection-editor']"`.

> [!IMPORTANT]
> A new `data-docs-id` must be **deployed to the target environment** before a capture
> targeting it will work. If the selector isn't found, `shot-scraper` fails the shot.

---

## Environment variables

Set these in a `.env` file at the repo root (copy `.env.example` and fill it in).
`capture.py` loads it automatically; anything already exported in your shell or CI wins.

| Variable | Required | Default | Notes |
| --- | --- | --- | --- |
| `PLATFORM_BASE_URL` | yes | — | e.g. `https://app.confident-ai.com` |
| `CONFIDENT_PROJECT_ID` | yes | — | fills `:projectId` in every path |
| `S3_BUCKET` | yes | — | docs bucket, `confident-docs` |
| `CONFIDENT_AI_CONNECTION_ID` | only if a path uses `:aiConnectionId` | — | fills `:aiConnectionId` |
| `CONFIDENT_ANNOTATION_FORM_ID` | only if a path uses `:annotationFormId` | — | fills `:annotationFormId` (the annotation form editor shots) |
| `CONFIDENT_TEST_RUN_ID` | only if a path uses `:testRunId` | — | fills `:testRunId` (the multi-generation test cases shot) |
| `SHOTSCRAPER_AUTH_FILE` | no | `auth.json` | saved logged-in session |
| `SHOTS_FILE` | no | `screenshots/shots.json` | alternate manifest |
| `ONLY_PATH_PREFIX` | no | _(all)_ | only capture shots whose `path` starts with this prefix |
| `DRY_RUN` | no | _(off)_ | `1` = capture but **do not** upload |
| `OUT_DIR` | no | temp dir | keep PNGs here for inspection |

AWS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`) are
only needed for real publishes; dry runs never touch AWS.

---

## Authentication (`auth.json`)

The platform requires login, so we capture a browser session **once** and reuse it.
`shot-scraper auth` opens a real Chromium window — log in normally, return to the terminal,
and press Enter to save the session:

```bash
shot-scraper auth https://app.confident-ai.com/auth/login auth.json
```

> [!NOTE]
> - `auth.json` is **git-ignored** (it contains live cookies) — your editor may grey it out, but it's there.
> - Sessions are **domain-specific**. A session saved against `app.confident-ai.com` will **not** work on `localhost:3000`; generate a separate file (e.g. `auth-local.json`) and point `SHOTSCRAPER_AUTH_FILE` at it.
> - To run in CI, paste the file's contents into the `SHOTSCRAPER_AUTH` secret.

---

## Running locally

With `.env` in place, every run is one command.

### 1. Preview (recommended first) — no upload

```bash
DRY_RUN=1 python screenshots/capture.py
```

Open the PNGs in `./_shots/` (set via `OUT_DIR`) to check the crops before publishing.
(`_shots/` is git-ignored.)

### 2. Capture only a subset

Scope a run with `ONLY_PATH_PREFIX` (set it in `.env`, or override inline):

```bash
ONLY_PATH_PREFIX="/project/:projectId/project-settings/ai-connections" python screenshots/capture.py
```

### 3. Publish to S3

Just run it (uploads using the AWS creds from `.env`):

```bash
python screenshots/capture.py
```

---

## Adding a new screenshot

The whole point of the manifest is that this is **mostly data, not code**:

1. **Add a stable anchor** in `confident-cloud` if one doesn't exist:
   ```tsx
   <div data-docs-id="my-feature-panel"> ... </div>
   ```
   …and **deploy it** to the environment you'll screenshot (`PLATFORM_BASE_URL`).

2. **Add an entry to `shots.json`** (every key is documented inline in the `_fields` legend at the top of the file). A full-page shot — the default for these docs — looks like:
   ```json
   {
     "s3_key": "my-feature:panel.png",
     "doc": "fern/docs/pages/.../my-feature.mdx",
     "path": "/project/:projectId/my-feature",
     "click": "Some Tab",
     "selector": "[data-docs-id='my-feature-panel']",
     "full_page": true,
     "width": 1512,
     "height": 900
   }
   ```
   - Drop `click` if the content is already visible on load.
   - For a tight crop of just the element instead of the whole window, omit `full_page`/`width`/`height` and keep only `selector`.
   - The top-level `local_storage` default (collapse Getting Started, hide the Book-a-demo banner) is applied automatically — no need to repeat it per shot.
   - `height` is the only value you'll usually tune: preview with a dry run and shrink/grow it until the content fits with no empty space or cutoff.

3. **Reference it in the MDX** using the same `s3_key`:
   ```mdx
   <Frame caption="My feature">
     <img src="https://confident-docs.s3.us-east-1.amazonaws.com/my-feature%3Apanel.png" />
   </Frame>
   ```
   (S3 keys with `:` are URL-encoded as `%3A`.)

4. **Preview, then publish** with the commands above.

> [!WARNING]
> **New `s3_key` → make it public once.** This bucket grants public read via an explicit
> per-object allow-list in its bucket policy (not a wildcard), so a brand-new key returns
> `403` until its ARN is added. **Overwriting an existing docs key needs nothing** — it's
> already public. To publish under a new key, add it once:
> ```bash
> aws s3api get-bucket-policy --bucket confident-docs --query Policy --output text > policy.json
> # add  "arn:aws:s3:::confident-docs/my-feature:panel.png"  to the PublicReadGetObject Resource list
> aws s3api put-bucket-policy --bucket confident-docs --policy file://policy.json
> ```
> Verify: `curl -sI "https://confident-docs.s3.us-east-1.amazonaws.com/my-feature%3Apanel.png"` → `200 OK`.

---

## Running in CI

A manual GitHub Action lives at [`.github/workflows/screenshots.yml`](../.github/workflows/screenshots.yml).
Trigger it from the **Actions → screenshots → Run workflow** menu:

- **`only_path_prefix`** — scope the run (blank = capture everything).
- **`dry_run`** — capture without uploading (good for a first check).

### One-time repo setup

Secrets (**Settings → Secrets and variables → Actions**), or via `gh`:

```bash
gh secret set SHOTSCRAPER_AUTH < auth.json
gh secret set CONFIDENT_PROJECT_ID --body "<projectId>"
gh secret set CONFIDENT_AI_CONNECTION_ID --body "<aiConnectionId>"
gh secret set CONFIDENT_ANNOTATION_FORM_ID --body "<annotationFormId>"
gh secret set CONFIDENT_TEST_RUN_ID --body "<testRunId>"
gh secret set AWS_ACCESS_KEY_ID --body "<key>"
gh secret set AWS_SECRET_ACCESS_KEY --body "<secret>"

gh variable set PLATFORM_BASE_URL --body "https://app.confident-ai.com"
gh variable set SCREENSHOTS_S3_BUCKET --body "confident-docs"
```

| Name | Kind | Purpose |
| --- | --- | --- |
| `SHOTSCRAPER_AUTH` | secret | contents of `auth.json` |
| `CONFIDENT_PROJECT_ID` | secret | seeded demo project id |
| `CONFIDENT_AI_CONNECTION_ID` | secret | seeded demo AI connection id |
| `CONFIDENT_ANNOTATION_FORM_ID` | secret | seeded demo annotation form id |
| `CONFIDENT_TEST_RUN_ID` | secret | demo multi-generation test run id |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | secret | write access to the docs bucket |
| `PLATFORM_BASE_URL` | variable | environment to screenshot |
| `SCREENSHOTS_S3_BUCKET` | variable | `confident-docs` |

---

## Troubleshooting

| Symptom | Cause & fix |
| --- | --- |
| `403 Forbidden` when opening the image URL | New `s3_key` isn't in the bucket policy. Add its ARN once (see [Adding a new screenshot](#adding-a-new-screenshot)). |
| `shot-scraper failed` / `getBoundingClientRect of null` | The `selector` (or `click` target) wasn't found. Confirm the `data-docs-id` is **deployed**, and that lazy-mounted panels are revealed via `click`. |
| `click text not found` / `click target not found` | A `click` matched no element, so the shot failed instead of capturing the wrong state. Check the label text is **exact** (watch for added count badges) and that the element is deployed/visible. |
| Crop is mostly black / cut off | A tall panel inside a scroll container wasn't painted below the fold. Add `"height": 1500` (or larger) to the shot. |
| Tab `click` does nothing | Tabs are plain `<div onClick>`. The text matcher already handles this (clicks the innermost element with exact text) — make sure the `click` text matches the label **exactly**. |
| Payload `Code`/`JSON` shot shows the wrong editor | The payload shots assume the demo connection is **saved in JSON mode**: `payload-json` captures the default, `payload-code` toggles to Code via the mode dropdown. If the connection is saved in Code mode, switch it back to JSON. |
| Auth doesn't work on `localhost` | Sessions are domain-locked. Generate a `localhost` session and set `SHOTSCRAPER_AUTH_FILE=auth-local.json`. |
| `missing required environment variable` | Set the variable it names (commonly `CONFIDENT_AI_CONNECTION_ID` for connection paths). |

---

## Files

| File | Purpose |
| --- | --- |
| `shots.json` | the screenshot manifest (edit this to add/change shots) |
| `capture.py` | the runner (rarely needs editing) |
| `README.md` | this guide |
| `.env.example` | config template (repo root, committed) — copy to `.env` |
| `.env` | local config (repo root, git-ignored) |
| `auth.json` | saved session (git-ignored, create locally) |
| `_shots/` | local preview output (git-ignored) |
