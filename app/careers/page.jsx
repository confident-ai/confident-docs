import Banner from "@/components/Careers/Banner/Banner";
import OpenPositions from "@/components/Careers/OpenPositions/OpenPositions";
import TextSection from "@/components/Careers/TextSection/TextSection";
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
    url: "https://confident-ai.com",
    siteName: "Confident AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers",
    description:
      "Build and grow the world's biggest's open-source LLM evaluation product.",
    creator: "@confident_ai",
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
