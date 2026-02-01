(function loadPlausible() {
  if (typeof window === "undefined") return;

  // Avoid injecting twice
  if (document.querySelector('script[src*="plausible.io/js/"]')) return;

  const script = document.createElement("script");
  script.defer = true;
  script.setAttribute("data-domain", "confident-ai.com");
  script.src = "https://plausible.io/js/script.tagged-events.js";

  document.head.appendChild(script);
})();

// Video Registry - Central source for all video URLs
(function loadVideoRegistry() {
  if (typeof window === "undefined") return;

  const S3_BASE = "https://confident-docs.s3.us-east-1.amazonaws.com";

  const VIDEOS = {
    // Metrics
    "metrics.createCollection": `${S3_BASE}/metrics:create-collection-4k.mp4`,

    // Custom Metrics
    "customMetrics.generalInfo": `${S3_BASE}/metric:general-info.mp4`,
    "customMetrics.selectParameters": `${S3_BASE}/metric:select-parameters.mp4`,
    "customMetrics.criteria": `${S3_BASE}/metric:criteria.mp4`,
    "customMetrics.evaluationSteps": `${S3_BASE}/metric:evaluation-steps.mp4`,
    "customMetrics.rubric": `${S3_BASE}/metric:rubric.mp4`,

    // Datasets
    "datasets.create": `${S3_BASE}/datasets:create-4k.mp4`,
    "datasets.uploadCsv": `${S3_BASE}/datasets:upload-csv-4k.mp4`,
    "datasets.newColumn": `${S3_BASE}/datasets:new-column-4k.mp4`,
    "datasets.assign": `${S3_BASE}/datasets:assign-4k.mp4`,
    "datasets.delete": `${S3_BASE}/datasets:delete-4k.mp4`,

    // TODO: Dataset videos to record
    "datasets.addImages": "TODO.mp4",
    "datasets.editNonText": "TODO.mp4",
    "datasets.addColumn": "TODO.mp4",
    "datasets.finalize": "TODO.mp4",
    "datasets.duplicate": "TODO.mp4",

    // Evaluation / Test Runs
    "evaluation.singleTurnE2E": `${S3_BASE}/evaluation:single-turn-e2e-report.mp4`,
    "evaluation.singleTurnComponentLevel": `${S3_BASE}/evaluation:single-turn-e2e-report-tracing.mp4`,
    "evaluation.multiTurnReport": `${S3_BASE}/evaluation:multi-turn-e2e-report.mp4`,
    "evaluation.abRegressionTesting": `${S3_BASE}/evaluation:ab-regression-testing.mp4`,
    "evaluation.parameterInsights": `${S3_BASE}/evaluation:parameter-insights.mp4`,

    // Prompts
    "prompts.createMessages": `${S3_BASE}/prompts:create-messages-4k.mp4`,
    "prompts.createText": `${S3_BASE}/prompts:create-text-4k.mp4`,
    "prompts.labelVersions": `${S3_BASE}/prompts:label-versions.mp4`,

    // LLM Tracing
    "tracing.traces": `${S3_BASE}/llm-tracing:traces.mp4`,
    "tracing.spans": `${S3_BASE}/llm-tracing:spans.mp4`,
    "tracing.threads": `${S3_BASE}/llm-tracing:threads.mp4`,
    "tracing.costTracking": `${S3_BASE}/llm-tracing:cost-tracking.mp4`,

    // Annotation / Human-in-the-Loop
    "annotation.traces": `${S3_BASE}/annotation:traces.mp4`,
    "annotation.spans": `${S3_BASE}/annotation:spans.mp4`,
    "annotation.threads": `${S3_BASE}/annotation:threads.mp4`,

    // Queues
    "queues.createQueue": `${S3_BASE}/queues:create-queue.mp4`,
    "queues.addTraces": `${S3_BASE}/queues:add-traces.mp4`,
    "queues.annotateItems": `${S3_BASE}/queues:annotate-items.mp4`,
    "queues.markItems": `${S3_BASE}/queues:mark-items.mp4`,
    "queues.manageItems": `${S3_BASE}/queues:manage-items.mp4`,

    // TODO: Videos to record
    "arena.overview": "TODO.mp4",
    "experiments.overview": "TODO.mp4",
  };

  // Find all videos with data-video attribute and set their src
  function loadVideos() {
    document.querySelectorAll("video[data-video]").forEach((video) => {
      const key = video.getAttribute("data-video");
      if (VIDEOS[key] && !video.src) {
        video.src = VIDEOS[key];
      }
    });
  }

  // Run on initial load
  loadVideos();
  document.addEventListener("DOMContentLoaded", loadVideos);

  // Watch for SPA navigation (new elements added to DOM)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        loadVideos();
        break;
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Also expose for manual use
  window.VIDEOS = VIDEOS;
  window.loadVideos = loadVideos;
})();

// Image Registry - Central source for all image URLs
(function loadImageRegistry() {
  if (typeof window === "undefined") return;

  const S3_BASE = "https://confident-docs.s3.us-east-1.amazonaws.com";

  const IMAGES = {
    // Concepts
    "concepts.arenaVsGeval": `${S3_BASE}/concepts:arena-vs-geval.png`,

    // TODO: Experiments images to capture
    "experiments.resultsComparison": "TODO.png",
    "experiments.arenaContestants": "TODO.png",
    "experiments.runDialog": "TODO.png",
    "experiments.createFromTestRun": "TODO.png",
    "experiments.metricsOverview": "TODO.png",

    // TODO: Arena images to capture
    "arena.promptConfig": "TODO.png",
    "arena.aiConnectionConfig": "TODO.png",
    "arena.imageInput": "TODO.png",

    // TODO: No-code multi-turn images to capture
    "noCode.multiTurn.promptConfig": "TODO.png",
    "noCode.multiTurn.aiConnectionConfig": "TODO.png",

    // TODO: No-code single-turn images to capture
    "noCode.singleTurn.promptConfig": "TODO.png",
    "noCode.singleTurn.aiConnectionConfig": "TODO.png",

    // TODO: Prompts images to capture
    "prompts.configureModelSettings": "TODO.png",
    "prompts.configureOutputType": "TODO.png",
    "prompts.configureSchemaOutput": "TODO.png",
    "prompts.attachTools": "TODO.png",
    "concepts.singleTurnLlmJudge": `${S3_BASE}/concepts:single-turn-llm-judge.png`,
    "concepts.multiTurnLlmJudge": `${S3_BASE}/concepts:multi-turn-llm-judge.png`,
    "concepts.geval": `${S3_BASE}/concepts:geval.png`,
    "concepts.dag": `${S3_BASE}/concepts:dag.png`,
    "concepts.llmTestCase": `${S3_BASE}/concepts:llm-test-case.png`,
    "concepts.conversationalTestCase": `${S3_BASE}/concepts:conversational-test-case.png`,
    "concepts.conversationalTestCaseSvg": `${S3_BASE}/concepts:conversational-test-case.svg`,

    // Data
    "data.organization": `${S3_BASE}/data-organization.svg`,

    // Settings - Data Residency
    "settings.dataResidency": `${S3_BASE}/settings:data-residency.png`,

    // Settings - Organization
    "settings.organization.auth": `${S3_BASE}/confident-docs:organization-auth.png`,

    // Settings - Project
    "settings.project.rolesPermissions": `${S3_BASE}/settings:project:roles-n-permissions.png`,
    "settings.project.apiKeys": `${S3_BASE}/settings:project:api-keys.png`,
    "settings.project.evaluationModel": `${S3_BASE}/settings:project:evaluation-model.png`,
    "settings.project.integrations": `${S3_BASE}/settings:project:integrations.png`,
    "settings.project.team": `${S3_BASE}/settings:project:team.png`,
    "settings.project.aiConnection": `${S3_BASE}/settings:project:ai-connection.png`,
    "settings.project.annotationOptions": `${S3_BASE}/settings:project:annotation-options.png`,
    "settings.project.dataRetention": `${S3_BASE}/settings:project:data-retention.png`,
    "settings.project.alerts": `${S3_BASE}/settings:project:alerts.png`,

    // Third-Party Logos
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
    "logos.portkey":
      "https://thumb.ac-illust.com/42/425e87b240c970dfc92bfb0252ea7e52_t.jpeg",
  };

  // Find all images with data-image attribute and set their src
  function loadImages() {
    document.querySelectorAll("img[data-image]").forEach((img) => {
      const key = img.getAttribute("data-image");
      const currentSrc = img.getAttribute("src") || "";
      // Replace if src is empty or a placeholder data URI
      const needsReplacement = !currentSrc || currentSrc.startsWith("data:");
      if (IMAGES[key] && needsReplacement) {
        img.src = IMAGES[key];
      }
    });
  }

  // Run on initial load
  loadImages();
  document.addEventListener("DOMContentLoaded", loadImages);

  // Watch for SPA navigation (new elements added to DOM)
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.addedNodes.length) {
        loadImages();
        break;
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  // Also expose for manual use
  window.IMAGES = IMAGES;
  window.loadImages = loadImages;
})();
