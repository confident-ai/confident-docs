import Memberships from '@/components/Pricing/Memberships/Memberships'
import GlobalLayout from '../global-layout'

export const metadata = {
  title: 'Confident AI - The DeepEval LLM Evaluation Platform',
  description:
    'The DeepEval LLM evaluation platform to test, benchmark, safeguard, and improve LLM application performance, with best-in-class metrics and guardrails.',
  metadataBase: 'https://confident-ai.com', 
  openGraph: {
    title: 'Confident AI - The DeepEval LLM Evaluation Platform',
    description:
      'The DeepEval LLM evaluation platform to test, benchmark, safeguard, and improve LLM application performance, with best-in-class metrics and guardrails.',
    url: 'https://confident-ai.com',
    siteName: 'Confident AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Confident AI - The DeepEval LLM Evaluation Platform',
    description:
      'The DeepEval LLM evaluation platform to test, benchmark, safeguard, and improve LLM application performance, with best-in-class metrics and guardrails.',
    creator: '@confident_ai', 
  },
};
export default function HomePage() {
  return (
    <>

      <GlobalLayout>
        <Memberships/>
      </GlobalLayout>
    </>
  )
}



