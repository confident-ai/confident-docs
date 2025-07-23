import { Layout } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import Footer from "@/components/Footer/Footer";
import CustomBanner from "@/components/CustomBanner/CustomBanner";

import CustomNavbar from "@/components/CustomNavbar/CustomNavbar";
import "@/app/styles/globals.css";

export default async function DocsLayout({ children }) {
  const pageMap = await getPageMap();

  const pagesToFilter = ["index", "products", "pricing", "blog", "careers"];
  const filteredPageMap = pageMap.filter(
    page => !pagesToFilter.includes(page.name)
  );

  return (
    <div className="docs-layout">
      <Layout
        darkMode={false}
        nextThemes={{ defaultTheme: "light" }}
        banner={<CustomBanner />}
        navbar={<CustomNavbar isDocsPage={true} />}
        pageMap={filteredPageMap}
        docsRepositoryBase="https://github.com/confident-ai/confident-docs/tree/main"
        footer={<Footer variant="light" />}
      >
        {children}
      </Layout>
    </div>
  );
}
