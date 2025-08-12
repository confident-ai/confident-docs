"use client"
import "nextra-theme-docs/style.css";
import ConditionalHead from "./ConditionalHead";
import { usePathname } from "next/navigation";

export default async function RootLayout({ children }) {
  const pathname = usePathname();
  const isDocsOrBlog =
    pathname === "/docs" ||
    pathname.startsWith("/docs/") ||
    pathname.startsWith("/blog/");
  return (
    <html
      style={{ backgroundColor: isDocsOrBlog ? "" : "#0e0e13" }}
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <ConditionalHead />
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PJ6SMMP5"
            height="0"
            width="0"
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
