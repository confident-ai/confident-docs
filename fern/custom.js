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