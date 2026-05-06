(function loadPlausible() {
  if (typeof window === "undefined") return;

  if (document.querySelector('script[src*="plausible.io/js/"]')) return;

  const script = document.createElement("script");
  script.defer = true;
  script.setAttribute("data-domain", "confident-ai.com");
  script.src = "https://plausible.io/js/script.tagged-events.js";

  document.head.appendChild(script);
})();

function runOnDomUpdates(callback) {
  let observer = null;

  callback();
  document.addEventListener("DOMContentLoaded", callback);

  function observeBody() {
    if (!document.body || observer) return;

    observer = new MutationObserver((mutations) => {
      if (mutations.some((mutation) => mutation.addedNodes.length)) callback();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  observeBody();
  document.addEventListener("DOMContentLoaded", observeBody);
}

(function loadVideoRegistry() {
  if (typeof window === "undefined") return;

  const S3_BASE = "https://confident-docs.s3.us-east-1.amazonaws.com";

  const VIDEOS = {
    "metrics.createCollection": `${S3_BASE}/metrics:create-collection-4k.mp4`,

    "customMetrics.generalInfo": `${S3_BASE}/metric:general-info.mp4`,
    "customMetrics.selectParameters": `${S3_BASE}/metric:select-parameters.mp4`,
    "customMetrics.criteria": `${S3_BASE}/metric:criteria.mp4`,
    "customMetrics.evaluationSteps": `${S3_BASE}/metric:evaluation-steps.mp4`,
    "customMetrics.rubric": `${S3_BASE}/metric:rubric.mp4`,

    "datasets.create": `${S3_BASE}/datasets:create-4k.mp4`,
    "datasets.uploadCsv": `${S3_BASE}/datasets:upload-csv-4k.mp4`,
    "datasets.newColumn": `${S3_BASE}/datasets:new-column-4k.mp4`,
    "datasets.assign": `${S3_BASE}/datasets:assign-4k.mp4`,
    "datasets.delete": `${S3_BASE}/datasets:delete-4k.mp4`,

    "evaluation.singleTurnE2E": `${S3_BASE}/evaluation:single-turn-e2e-report.mp4`,
    "evaluation.singleTurnComponentLevel": `${S3_BASE}/evaluation:single-turn-e2e-report-tracing.mp4`,
    "evaluation.multiTurnReport": `${S3_BASE}/evaluation:multi-turn-e2e-report.mp4`,
    "evaluation.abRegressionTesting": `${S3_BASE}/evaluation:ab-regression-testing.mp4`,
    "evaluation.parameterInsights": `${S3_BASE}/evaluation:parameter-insights.mp4`,

    "prompts.createMessages": `${S3_BASE}/prompts:create-messages-4k.mp4`,
    "prompts.createText": `${S3_BASE}/prompts:create-text.mp4`,
    "prompts.labelVersions": `${S3_BASE}/prompts:label-versions.mp4`,

    "tracing.traces": `${S3_BASE}/llm-tracing:traces.mp4`,
    "tracing.spans": `${S3_BASE}/llm-tracing:spans.mp4`,
    "tracing.threads": `${S3_BASE}/llm-tracing:threads.mp4`,
    "tracing.costTracking": `${S3_BASE}/llm-tracing:cost-tracking.mp4`,
    "tracing.quickstart": `${S3_BASE}/tracing:quickstart.mp4`,

    "annotation.traces": `${S3_BASE}/annotation:traces.mp4`,
    "annotation.spans": `${S3_BASE}/annotation:spans.mp4`,
    "annotation.threads": `${S3_BASE}/annotation:threads.mp4`,

    "queues.createQueue": `${S3_BASE}/queues:create-queue.mp4`,
    "queues.addTraces": `${S3_BASE}/queues:add-traces.mp4`,
    "queues.annotateItems": `${S3_BASE}/queues:annotate-items.mp4`,
    "queues.markItems": `${S3_BASE}/queues:mark-items.mp4`,
    "queues.manageItems": `${S3_BASE}/queues:manage-items.mp4`,

    "arena.overview": `${S3_BASE}/arena:overview.mp4`,
    "experiments.overview": `${S3_BASE}/experiments:overview.mp4`,
  };

  function loadVideos() {
    document.querySelectorAll("video[data-video]").forEach((video) => {
      const key = video.getAttribute("data-video");
      if (VIDEOS[key] && !video.src) {
        video.src = VIDEOS[key];
      }
    });
  }

  runOnDomUpdates(loadVideos);

  window.VIDEOS = VIDEOS;
  window.loadVideos = loadVideos;
})();

(function loadImageRegistry() {
  if (typeof window === "undefined") return;

  const S3_BASE = "https://confident-docs.s3.us-east-1.amazonaws.com";

  const IMAGES = {
    "tracing.spanTypes": `${S3_BASE}/tracing:span-types.png`,
    "tracing.onlineEvals": `${S3_BASE}/tracing:online-evals.png`,
    "tracing.promptObservability": `${S3_BASE}/llm-tracing:prompt-logging.png`,

    "datasets.addImages": `${S3_BASE}/datasets:add-images.png`,
    "datasets.editNonText": `${S3_BASE}/datasets:edit-non-text.png`,
    "datasets.duplicate": `${S3_BASE}/datasets:duplicate.png`,
    "datasets.singleTurn.page": `${S3_BASE}/datasets:single-turn:page.png`,
    "datasets.multiTurn.page": `${S3_BASE}/datasets:multi-turn:page.png`,
    "datasets.multiTurn.promptConfig": `${S3_BASE}/datasets:multi-turn:prompt-config.png`,
    "datasets.multiTurn.aiConnectionConfig": `${S3_BASE}/datasets:multi-turn:ai-connection-config.png`,
    "datasets.singleTurn.promptConfig": `${S3_BASE}/datasets:single-turn:prompt-config.png`,
    "datasets.singleTurn.aiConnectionConfig": `${S3_BASE}/datasets:single-turn:ai-connection-config.png`,
    "datasets.scheduleDatasetEvals": `${S3_BASE}/datasets:scheduled-dataset-evals.png`,

    "experiments.resultsComparison": `${S3_BASE}/experiments:results-comparison.png`,
    "experiments.runDialog": `${S3_BASE}/experiments:run-dialog.png`,
    "experiments.createFromTestRuns": `${S3_BASE}/experiments:create-from-test-runs.png`,
    "experiments.metricsOverview": `${S3_BASE}/experiments:metrics-overview.png`,

    "arena.promptConfig": `${S3_BASE}/arena:prompt-config.png`,
    "arena.aiConnectionConfig": `${S3_BASE}/arena:ai-connection-config.png`,
    "arena.mixedConfig": `${S3_BASE}/arena:mixed-config.png`,
    "arena.imageInput": `${S3_BASE}/arena:image-input.png`,
    "arena.contestants": `${S3_BASE}/arena:contestants.png`,
    "arena.variables": `${S3_BASE}/arena:variables.png`,
    "arena.quickRun": `${S3_BASE}/arena:quick-run.png`,
    "arena.modelConfigs": `${S3_BASE}/arena:model-configs.png`,

    "prompts.configureModelSettings": `${S3_BASE}/prompts:configure-model-settings.png`,
    "prompts.configureOutputType": `${S3_BASE}/prompts:configure-output-type.png`,
    "prompts.configureSchemaOutput": `${S3_BASE}/prompts:configure-output-schema.png`,
    "prompts.attachTools": `${S3_BASE}/prompts:attach-tools.png`,
    "prompts.includeImages": `${S3_BASE}/prompts:include-images.png`,

    "concepts.arenaVsGeval": `${S3_BASE}/concepts:arena-vs-geval.png`,
    "concepts.singleTurnLlmJudge": `${S3_BASE}/concepts:single-turn-llm-judge.png`,
    "concepts.multiTurnLlmJudge": `${S3_BASE}/concepts:multi-turn-llm-judge.png`,
    "concepts.geval": `${S3_BASE}/concepts:geval.png`,
    "concepts.dag": `${S3_BASE}/concepts:dag.png`,
    "concepts.llmTestCase": `${S3_BASE}/concepts:llm-test-case.png`,
    "concepts.conversationalTestCase": `${S3_BASE}/concepts:conversational-test-case.png`,
    "concepts.conversationalTestCaseSvg": `${S3_BASE}/concepts:conversational-test-case.svg`,

    "redTeaming.chooseFramework": `${S3_BASE}/red-teaming:fameworks:choose-framework.png`,
    "redTeaming.createFramework": `${S3_BASE}/red-teaming:frameworks:create-framework.png`,
    "redTeaming.customizeRiskCategory": `${S3_BASE}/red-teaming:frameworks:customize-risk-category.png`,
    "redTeaming.riskAssessment": `${S3_BASE}/red-teaming:quick-start:risk-assessment.png`,
    "redTeaming.runRiskAssessment": `${S3_BASE}/red-teaming:quick-start:run-risk-assessment.png`,
    "redTeaming.riskAssessmentTestCases": `${S3_BASE}/red-teaming:risk-profile:risk-assessment-test-cases.png`,
    "redTeaming.scheduledRedTeamFramework": `${S3_BASE}/red-teaming:scheduled-red-team-framework.png`,

    "data.organization": `${S3_BASE}/data-organization.svg`,

    "settings.dataResidency": `${S3_BASE}/settings:data-residency.png`,

    support: `${S3_BASE}/support.png`,

    "settings.organization.auth": `${S3_BASE}/confident-docs:organization-auth.png`,
    "settings.organization.rolesPermissions": `${S3_BASE}/settings:org:roles-n-permissions.png`,
    "settings.organization.dataRetention": `${S3_BASE}/settings:org:data-retention.png`,
    "settings.organization.auditLogs": `${S3_BASE}/settings:org:audit-logs.png`,

    "settings.project.rolesPermissions": `${S3_BASE}/settings:project:roles-n-permissions.png`,
    "settings.project.apiKeys": `${S3_BASE}/settings:project:api-keys.png`,
    "settings.project.evaluationModel": `${S3_BASE}/settings:project:evaluation-model.png`,
    "settings.project.integrations": `${S3_BASE}/settings:project:integrations.png`,
    "settings.project.team": `${S3_BASE}/settings:project:team.png`,
    "settings.project.aiConnection": `${S3_BASE}/settings:project:ai-connection.png`,
    "settings.project.annotationOptions": `${S3_BASE}/settings:project:annotation-options.png`,
    "settings.project.dataRetention": `${S3_BASE}/settings:project:data-retention.png`,
    "settings.project.auditLogs": `${S3_BASE}/settings:project:audit-logs.png`,
    "settings.project.alerts": `${S3_BASE}/settings:project:alerts.png`,
    "settings.project.modelCosts": `${S3_BASE}/settings:project:model-costs.png`,
    "settings.project.dataUsage": `${S3_BASE}/settings:project:data-usage.png`,
    "settings.project.categories": `${S3_BASE}/settings:project:categories.png`,

    "selfHosting.aws.architecture": `${S3_BASE}/self-hosting:aws-architecture.png`,

    "logos.openai": "https://www.svgrepo.com/show/306500/openai.svg",
    "logos.langchain": "https://logo.svgcdn.com/s/langchain-dark-8x.png",
    "logos.pydantic":
      "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/logos/pydantic-srs7pxjs9skodrjb64x86f.png/pydantic-ae96ag6mv67bf6hz5726v8.png?_a=DATAg1AAZAA0",
    "logos.langgraph":
      "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/langgraph.png",
    "logos.llamaindex":
      "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/llamaindex.png",
    "logos.crewai":
      "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/crewai.png",
    "logos.litellm":
      "https://thumb.ac-illust.com/42/425e87b240c970dfc92bfb0252ea7e52_t.jpeg",
    "logos.vercelaisdk": "https://karmanivero.us/assets/images/logo-vercel.png",
    "logos.portkey":
      "https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/text-formatting/hexagon-tkv73cir8m2b39ei1hkca.png/hexagon-osek3863mig4att1do9c7.png?_a=DATAiZAAZAA0",
  };

  function loadImages() {
    document.querySelectorAll("img[data-image]").forEach((img) => {
      const key = img.getAttribute("data-image");
      const currentSrc = img.getAttribute("src") || "";
      const needsReplacement = !currentSrc || currentSrc.startsWith("data:");
      if (IMAGES[key] && needsReplacement) {
        img.src = IMAGES[key];
      }
    });
  }

  runOnDomUpdates(loadImages);

  window.IMAGES = IMAGES;
  window.loadImages = loadImages;
})();

(function loadCtaInjector() {
  if (typeof window === "undefined") return;

  const DEMO_URL = "https://www.confident-ai.com/book-a-demo";
  const IMPRESSION_THRESHOLD = 0.5;

  const CTA_ICON =
    '<svg class="cta-icon" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

  const STICKY_CTA = {
    title: "Evaluating Confident AI?",
    subtitle: "For teams planning production evaluation workflows",
    action: "Talk to us",
  };

  const INLINE_CTAS = {
    "self-hosting": {
      title: "Planning a private deployment?",
      subtitle: "Get a clear deployment path across architecture, security, and rollout",
      action: "Talk to deployment team",
    },
    "self-hosting-aws": {
      title: "Planning AWS deployment?",
      subtitle: "Avoid infrastructure surprises across EKS, networking, IAM, and ownership",
      action: "Talk to deployment team",
    },
    "self-hosting-security": {
      title: "Preparing for a security review?",
      subtitle: "Align security, compliance, and private deployment requirements before rollout",
      action: "Talk to security team",
    },
    "setup": {
      title: "Rolling this out for your team?",
      subtitle: "Plan the fastest path from setup to a production evaluation workflow",
      action: "Talk to us",
    },
    "api-reference": {
      title: "Building a production pipeline?",
      subtitle: "Design a scalable API workflow for evals, datasets, traces, and prompts",
      action: "Talk to an expert",
    },
    "settings-org": {
      title: "Rolling this out across your org?",
      subtitle: "Set up the controls your team needs before a wider rollout",
      action: "Talk to us",
    },
    "audit-logs": {
      title: "Need audit logs for compliance review?",
      subtitle: "Give security and compliance teams the visibility they expect",
      action: "Talk to us",
    },
    "ai-connections": {
      title: "Need help setting up?",
      subtitle: "Connect your app reliably across endpoints, auth, payloads, and streaming",
      action: "Talk to us",
    },
    "datasets": {
      title: "Curating datasets across your team?",
      subtitle: "Keep collaboration, annotation, and dataset quality organized at scale",
      action: "Book a demo",
    },
    "experiments": {
      title: "Running experiments across teams?",
      subtitle: "Find winning prompts and models with results your team can share",
      action: "Book a demo",
    },
    "ci-cd": {
      title: "Setting up evals in CI/CD?",
      subtitle: "Catch regressions before they ship with release-ready eval gates",
      action: "Talk to an expert",
    },
    "integrations": {
      title: "Connecting this to your stack?",
      subtitle: "Bring traces and evals into the tools your team already uses",
      action: "Talk to an expert",
    },
    "red-teaming": {
      title: "Securing AI for production?",
      subtitle: "Find safety gaps before users, auditors, or attackers do",
      action: "Book security briefing",
    },
    "framework-policies": {
      title: "Building a custom security framework?",
      subtitle: "Turn internal AI policies into repeatable tests and audit-ready reports",
      action: "Talk to security team",
    },
    "annotation-queues": {
      title: "Coordinating human review at scale?",
      subtitle: "Keep annotation work organized as reviewers, queues, and datasets grow",
      action: "Book a demo",
    },
    "data-handling": {
      title: "Going through a security review?",
      subtitle: "Get the data controls and compliance materials your team needs",
      action: "Talk to us",
    },
    "why-confident-ai": {
      title: "Evaluating vs your current stack?",
      subtitle: "See how evaluation, tracing, safety, and collaboration work together",
      action: "Book a demo",
    },
  };

  const BOTTOM_CTAS = [
    {
      match: "llm-tracing/introduction",
      title: "Monitoring AI in production?",
      subtitle: "Connect traces, alerts, dashboards, and evals in one production workflow",
      action: "Book a demo",
    },
    {
      match: "llm-evaluation/introduction",
      title: "Scaling evals across teams?",
      subtitle: "See how teams standardize evaluation before shipping LLM apps",
      action: "Book a demo",
    },
    {
      match: "llm-evaluation/quickstart",
      title: "Scaling beyond prototype?",
      subtitle: "Move from local tests to a repeatable evaluation process for your team",
      action: "Talk to us",
    },
    {
      match: "llm-evaluation/dataset-management",
      title: "Curating datasets across your team?",
      subtitle: "Keep collaboration, annotation, and dataset quality organized at scale",
      action: "Book a demo",
    },
    {
      match: "llm-evaluation/prompts",
      title: "Managing prompts in production?",
      subtitle: "Prompt versioning, A/B testing, and rollbacks for production teams",
      action: "Book a demo",
    },
    {
      match: "llm-evaluation/code-driven",
      title: "Setting up evals in CI/CD?",
      subtitle: "Catch regressions before they ship with release-ready eval gates",
      action: "Talk to an engineer",
    },
    {
      match: "settings/organization",
      title: "Rolling out across your org?",
      subtitle: "Set up the controls your team needs before a wider rollout",
      action: "Talk to us",
    },
    {
      match: "self-hosting",
      title: "Planning a private deployment?",
      subtitle: "Get a clear deployment path across cloud, security, and rollout needs",
      action: "Talk to deployment team",
    },
    {
      match: "llm-tracing",
      title: "Ready to monitor AI in production?",
      subtitle: "Connect traces, alerts, dashboards, and evals in one production workflow",
      action: "Book a demo",
    },
    {
      match: "api-reference",
      title: "Building a production pipeline?",
      subtitle: "Design a scalable API workflow for evals, datasets, traces, and prompts",
      action: "Talk to an engineer",
    },
    {
      match: "integrations",
      title: "Need help wiring this into your stack?",
      subtitle: "Bring traces and evals into the tools your team already uses",
      action: "Talk to an expert",
    },
    {
      match: "red-teaming",
      title: "Securing AI for production?",
      subtitle: "Find safety gaps before users, auditors, or attackers do",
      action: "Book a security briefing",
    },
    {
      match: "human-in-the-loop",
      title: "Coordinating annotators across teams?",
      subtitle: "Keep annotation work organized as reviewers, queues, and datasets grow",
      action: "Book a demo",
    },
    {
      match: "settings",
      title: "Setting this up for your organization?",
      subtitle: "Set up the controls your team needs before a wider rollout",
      action: "Talk to us",
    },
    {
      match: "",
      title: "Scaling beyond prototype?",
      subtitle: "For teams evaluating Confident AI in production",
      action: "Talk to us",
    },
  ];

  const INLINE_CTA_SLUGS = new Set([
    "api-reference/introduction",
    "human-in-the-loop/annotation-queues",
    "integrations",
    "llm-evaluation/code-driven/unit-testing-in-cicd",
    "llm-evaluation/dataset-management/manage-datasets",
    "llm-evaluation/experiments",
    "red-teaming/framework-policies",
    "red-teaming/introduction",
    "resources/data-handling",
    "resources/why-confident-ai",
    "self-hosting",
    "self-hosting/aws/overview",
    "self-hosting/security-and-compliance",
    "settings",
    "settings/project/ai-connections",
    "settings/project/audit-logs",
    "setup-and-installation",
  ]);

  const SKIP_BOTTOM_PATTERNS = [
    /^metrics\/all-metrics/,
    /^metrics\/custom-metrics/,
    /^llm-evaluation\/core-concepts/,
  ];

  function getCurrentSlug() {
    const path = (window.location && window.location.pathname) || "";
    return path.replace(/^\/+/, "").replace(/^docs\//, "").replace(/\/$/, "");
  }

  function getAnalyticsPage(slug) {
    return slug || "unknown";
  }

  function getSafeAnalyticsPage(slug) {
    return getAnalyticsPage(slug).replace(/[^a-z0-9-]/gi, "-");
  }

  function findBottomCta(slug) {
    const sorted = BOTTOM_CTAS.slice().sort(
      (a, b) => b.match.length - a.match.length
    );
    for (const cta of sorted) {
      if (cta.match === "") return cta;
      if (slug === cta.match) return cta;
      if (slug.startsWith(cta.match + "/")) return cta;
    }
    return null;
  }

  function shouldSkipBottom(slug) {
    return (
      INLINE_CTA_SLUGS.has(slug) ||
      SKIP_BOTTOM_PATTERNS.some((re) => re.test(slug))
    );
  }

  function buildUrl(type, slug) {
    const params = new URLSearchParams({
      utm_source: "docs",
      utm_medium: "cta-" + type,
      utm_content: getAnalyticsPage(slug),
    });
    return DEMO_URL + "?" + params.toString();
  }

  function buildPlausibleClasses(type, slug) {
    return [
      "plausible-event-name=ctaClick",
      "plausible-event-cta=" + type,
      "plausible-event-page=" + getSafeAnalyticsPage(slug),
    ].join(" ");
  }

  function createCtaAnchor(type, slug, extraClass) {
    const a = document.createElement("a");
    a.className = extraClass + " " + buildPlausibleClasses(type, slug);
    a.href = buildUrl(type, slug);
    a.target = "_blank";
    a.rel = "noopener";
    observeImpression(a, type, slug);
    return a;
  }

  function observeImpression(el, type, slug) {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          if (typeof window.plausible === "function") {
            window.plausible("ctaImpression", {
              props: { cta: type, page: getAnalyticsPage(slug) },
            });
          }
          observer.disconnect();
        });
      },
      { threshold: IMPRESSION_THRESHOLD }
    );
    observer.observe(el);
  }

  function buildTextBlock(prefix, cfg) {
    return [
      '<div class="' + prefix + '-text">',
      '<div class="' + prefix + '-title">' + cfg.title + "</div>",
      cfg.subtitle
        ? '<div class="' + prefix + '-subtitle">' + cfg.subtitle + "</div>"
        : "",
      "</div>",
    ].join("");
  }

  function buildAction(prefix, action) {
    return [
      '<div class="' + prefix + '-action">',
      CTA_ICON,
      "<span>" + action + "</span>",
      "</div>",
    ].join("");
  }

  function createBodyCta(type, slug, className, cfg, id) {
    const a = createCtaAnchor(type, slug, className);
    if (id) a.id = id;
    a.innerHTML =
      buildTextBlock(className, cfg) + buildAction(className, cfg.action);
    return a;
  }

  function createStickyCta(slug) {
    const a = createCtaAnchor("sticky", slug, "cta-sticky");
    a.id = "cta-sticky";
    a.innerHTML =
      '<div class="cta-sticky-title">' +
      STICKY_CTA.title +
      '</div><div class="cta-sticky-subtitle">' +
      STICKY_CTA.subtitle +
      "</div>" +
      buildAction("cta-sticky", STICKY_CTA.action);
    return a;
  }

  function createInlineCta(slug, cfg) {
    return createBodyCta("inline", slug, "cta-inline", cfg);
  }

  function createBottomCta(slug, cfg) {
    return createBodyCta("bottom", slug, "cta-bottom", cfg, "cta-bottom");
  }

  function findTocInsertionPoint() {
    return document.getElementById("fern-toc");
  }

  function findArticleContainer() {
    return (
      document.querySelector("article.w-content-width") ||
      document.querySelector("main article") ||
      document.querySelector("article")
    );
  }

  function processInlineMarkers(slug) {
    const markers = document.querySelectorAll("[data-cta]");
    markers.forEach((marker) => {
      const key = marker.getAttribute("data-cta");
      const cfg = INLINE_CTAS[key];
      if (!cfg) return;
      const cta = createInlineCta(slug, cfg);
      if (marker.parentNode) marker.parentNode.replaceChild(cta, marker);
    });
  }

  let lastSlug = null;

  function refreshCtas() {
    const slug = getCurrentSlug();

    if (slug !== lastSlug) {
      const oldSticky = document.getElementById("cta-sticky");
      if (oldSticky) oldSticky.remove();
      const oldBottom = document.getElementById("cta-bottom");
      if (oldBottom) oldBottom.remove();
      lastSlug = slug;
    }

    processInlineMarkers(slug);

    if (!document.getElementById("cta-sticky")) {
      const toc = findTocInsertionPoint();
      if (toc) toc.appendChild(createStickyCta(slug));
    }

    const hasInline = !!document.querySelector(".cta-inline");
    if (
      !document.getElementById("cta-bottom") &&
      !shouldSkipBottom(slug) &&
      !hasInline
    ) {
      const article = findArticleContainer();
      const cfg = findBottomCta(slug);
      if (article && cfg) article.appendChild(createBottomCta(slug, cfg));
    }
  }

  let scheduled = false;
  function scheduleRefresh() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      refreshCtas();
    });
  }

  scheduleRefresh();
  document.addEventListener("DOMContentLoaded", scheduleRefresh);

  const observer = new MutationObserver(scheduleRefresh);
  observer.observe(document.body, { childList: true, subtree: true });

  window.addEventListener("popstate", scheduleRefresh);

  window.__refreshCtas = refreshCtas;
})();
