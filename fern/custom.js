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
  const S3_BUCKET = "https://confident-bucket.s3.us-east-1.amazonaws.com";

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

    // Evaluation / Test Runs
    "evaluation.singleTurnReport": `${S3_BASE}/evaluation:single-turn-e2e-report.mp4`,
    "evaluation.singleTurnReportTracing": `${S3_BASE}/evaluation:single-turn-e2e-report-tracing.mp4`,
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

    // Integrations
    "integrations.createMetricCollection": `${S3_BASE}/integrations%3Athird-party-integrations%3Acreate-metric-collection-4k.mp4`,

    // End-to-End Demos
    "demos.langgraph": `${S3_BUCKET}/end-to-end%3Alanggraph.mp4`,
    "demos.pydantic": `${S3_BUCKET}/end-to-end%3Apydantic-1080.mp4`,
    "demos.llamaIndex": `${S3_BUCKET}/end-to-end%3Allama-index-1080.mp4`,
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
