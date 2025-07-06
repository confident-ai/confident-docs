import { Layout } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import CustomFooter from '@/components/CustomFooter/CustomFooter'
import CustomBanner from '@/components/CustomBanner/CustomBanner'
import CustomNavbar from '@/components/CustomNavbar/CustomNavbar'

export default async function DocsLayout({ children }) {
  const pageMap = await getPageMap()

  return (
    <Layout
      darkMode={false}
      nextThemes={{ defaultTheme: 'light' }}
      banner={<CustomBanner />}
      navbar={<CustomNavbar />}
      pageMap={pageMap}
      docsRepositoryBase="https://github.com/confident-ai/confident-docs/tree/main"
      footer={<CustomFooter />}
    >
      {children}
    </Layout>
  )
}