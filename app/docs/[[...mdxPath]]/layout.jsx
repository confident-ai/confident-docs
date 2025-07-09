import { Layout } from 'nextra-theme-docs'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import Footer from '@/components/Footer/Footer'
import CustomBanner from '@/components/CustomBanner/CustomBanner'
import CustomNavbar from '@/components/CustomNavbar/CustomNavbar'
import footerLinks from '../footerLinks'
export default async function DocsLayout({ children }) {
  const pageMap = await getPageMap()

  const filteredPageMap = pageMap.filter(page => page.name !== 'index')

  console.log(filteredPageMap)
  return (
    <Layout
      darkMode={false}
      nextThemes={{ defaultTheme: 'light' }}
      banner={<CustomBanner />}
      navbar={<CustomNavbar />}
      pageMap={filteredPageMap}
      docsRepositoryBase="https://github.com/confident-ai/confident-docs/tree/main"
      footer={<Footer variant='light' links={footerLinks} />}
    >
      {children}
    </Layout>
  )
}