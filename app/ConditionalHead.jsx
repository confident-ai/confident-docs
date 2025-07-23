"use client";

import { Head } from "nextra/components";
import { usePathname } from "next/navigation";
import Script from 'next/script'

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
      <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PJ6SMMP5');
          `}
        </Script>
      {/* Don't set title or description here as they're handled by Nextra via useNextSeoProps */}
    </Head>
  );
}
