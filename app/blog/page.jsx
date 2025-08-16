import Blogs from "@/components/blog/blogs";
import GlobalLayout from "@/app/global-layout";
import Banner from '@/components/blog/banner/banner'
export const metadata = {
  title: "Confident AI Blog - Resources to help teams stay confident in AI",
  description:
    "Join our weekly newsletter to stay confident in the AI systems you build. Our articles include tutorials, guides, and essays to safely build and evaluate LLMs.",
  metadataBase: "https://confident-ai.com",
  openGraph: {
    title: "Confident AI Blog - Resources to help teams stay confident in AI",
    description:
      "Join our weekly newsletter to stay confident in the AI systems you build. Our articles include tutorials, guides, and essays to safely build and evaluate LLMs.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Confident AI Blog - Resources to help teams stay confident in AI",
    description:
      "Join our weekly newsletter to stay confident in the AI systems you build. Our articles include tutorials, guides, and essays to safely build and evaluate LLMs.",
  },
};
export default async function Page() {
  return (
    <>
      <GlobalLayout>
        <Banner/>
        <Blogs limit={10} showTabs={true} blogOrientation="vertical" blogVariant="dark" disableLoader={false} />
      </GlobalLayout>
    </>
  );
}
