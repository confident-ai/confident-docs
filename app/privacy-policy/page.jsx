import { getTerm } from "@/functions/get-terms"; 
import styles from "./styles.module.scss";

import GlobalLayout from "../global-layout";
import TermsContent from '@/components/Terms/TermsContent';
export const metadata = {
  title: "Privacy Policy",
  description: "Companies of all sizes use Confident AI to justify why their LLM applications - RAG, Agents, or Chatbots, deserves to be in production.",
  metadataBase: "https://confident-ai.com",
  openGraph: {
    title: "Privacy Policy",
    description: "Companies of all sizes use Confident AI to justify why their LLM applications - RAG, Agents, or Chatbots, deserves to be in production.",
    url: "https://confident-ai.com",
    siteName: "Confident AI",
    locale: "en_US",
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Privacy Policy",
    description: "Companies of all sizes use Confident AI to justify why their LLM applications - RAG, Agents, or Chatbots, deserves to be in production.",
    creator: '@confident_ai',
  },
};

export default async function HomePage() {
  const term = await getTerm("privacy-policy");

  return (
    <>
      <GlobalLayout staticHeader={true}>
        <div className={`${styles.privacyPolicy}`}>
          <div className={styles.inner}>
              <TermsContent content={term?.fields?.textBlock} term={term} />
          </div>
        </div>
      </GlobalLayout>
    </>
  );
}
