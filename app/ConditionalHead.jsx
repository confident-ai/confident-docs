"use client";

import { Head } from "nextra/components";
import { usePathname } from "next/navigation";

export default function ConditionalHead() {
  const pathname = usePathname();

  // Check if we're on a docs page (path starts with /docs)
  const isDocsPage = pathname?.startsWith("/docs") || pathname?.startsWith("/api");

  return (
    <Head
      color={isDocsPage ? {
        hue: 265, // Violet hue
        saturation: 90, // Slightly reduced saturation
        lightness: {
          light: 45, // Slightly darker for light mode
          dark: 60, // Slightly lighter for dark mode
        },
      } : undefined}
    >
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <script
        defer
        data-domain="confident-ai.com"
        src="https://plausible.io/js/script.js"
      ></script>

      {/* Don't set title or description here as they're handled by Nextra via useNextSeoProps */}
    </Head>
  );
}
