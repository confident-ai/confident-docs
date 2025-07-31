import 'nextra-theme-docs/style.css'
import ConditionalHead from './ConditionalHead'

export default async function RootLayout({ children }) {
  return (
    <html
      style={{ scrollPaddingTop: "24px" }}
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
         
      </body>
    </html>
  )
}