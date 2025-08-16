import Form from "@/components/contactForm/form";
import GlobalLayout from "../global-layout";

export const metadata = {
  title: "Book A Demo Today | Confident AI",
  description:
    "Book a free demo today to get an expert walkthrough of your LLM evaluation business needs. Get full visibility into Confident AI's comprehensive LLM evaluation platform.",
  metadataBase: "https://confident-ai.com",
  openGraph: {
    title: "Book A Demo Today | Confident AI",
    description:
      "Book a free demo today to get an expert walkthrough of your LLM evaluation business needs. Get full visibility into Confident AI's comprehensive LLM evaluation platform.",
    url: "https://confident-ai.com/book-a-demo",
    siteName: "Confident AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book A Demo Today | Confident AI",
    description:
      "The DeepEval LLM evaluation platform to test, benchmark, safeguard, and improve LLM application performance.",
    creator: "@confident_ai",
  },
};
export default function HomePage() {
  return (
      <GlobalLayout staticHeader={true}>
        <Form />
      </GlobalLayout>
  );
}
