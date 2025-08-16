import Banner from "@/components/careers/banner/banner";
import OpenPositions from "@/components/careers/openPositions/openPositions";
import TextSection from "@/components/careers/textSection/textSection";
import GlobalLayout from "../global-layout";

export const metadata = {
  title: "Careers",
  description:
    "Build and grow the world's biggest's open-source LLM evaluation product.",
  metadataBase: "https://confident-ai.com",
  openGraph: {
    title: "Careers",
    description:
      "Build and grow the world's biggest's open-source LLM evaluation product.",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers",
    description:
      "Build and grow the world's biggest's open-source LLM evaluation product.",
  },
};
export default function HomePage() {
  return (
    <>
      <GlobalLayout staticHeader={true}>
        <Banner />
        <OpenPositions />
        <TextSection />
      </GlobalLayout>
    </>
  );
}
