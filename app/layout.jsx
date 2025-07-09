import { Layout } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '@/app/styles/globals.css'
import Script from 'next/script'

export default async function RootLayout({ children }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
        color={{
          hue: 265, // Violet hue
          saturation: 90, // Slightly reduced saturation
          lightness: {
            light: 45, // Slightly darker for light mode
            dark: 60  // Slightly lighter for dark mode
          }
        }}
      >
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
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
      <body suppressHydrationWarning>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJ6SMMP5"
          height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
        {children}
      </body>
    </html>
  )
}