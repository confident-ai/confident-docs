import 'nextra-theme-docs/style.css'
// import '@/app/styles/globals.css'
import Script from 'next/script'
import ConditionalHead from './ConditionalHead'

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
      
      <ConditionalHead />
      <body suppressHydrationWarning>
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PJ6SMMP5"
          height="0" width="0"></iframe></noscript>
        {children}
         <Script id="gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PJ6SMMP5');
          `}
        </Script>
      </body>
    </html>
  )
}