import Blogs from "@/components/Blog/Blogs";
import GlobalLayout from "@/app/global-layout";

export const metadata = {
  title: "Confident AI Blog - Resources to help teams stay confident in AI",
  description:
    "Join our weekly newsletter to stay confident in the AI systems you build. Our articles include tutorials, guides, and essays to safely build and evaluate LLMs.",
  metadataBase: "https://confident-ai.com",
  openGraph: {
    title: "Confident AI Blog - Resources to help teams stay confident in AI",
    description:
      "Join our weekly newsletter to stay confident in the AI systems you build. Our articles include tutorials, guides, and essays to safely build and evaluate LLMs.",
    url: "https://confident-ai.com",
    siteName: "Confident AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Confident AI Blog - Resources to help teams stay confident in AI",
    description:
      "Join our weekly newsletter to stay confident in the AI systems you build. Our articles include tutorials, guides, and essays to safely build and evaluate LLMs.",
    creator: "@confident_ai",
  },
};
export default async function Page() {
  return (
    <>
      <GlobalLayout>
        <Blogs />
      </GlobalLayout>
    </>
  );
}
