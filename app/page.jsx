import Banner from '@/components/home/banner/banner';
import TextSection from '@/components/home/textSection/textSection';
import TwoColumn from '@/components/home/twoColumn/twoColumn';
import ShowCase from '@/components/home/showCase/showCase';
import CardSection from '@/components/home/cardSection/cardSection';
import SecurityInsurance from '@/components/home/securityInsurance/securityInsurance';
import TextOnlySection from '@/components/home/textOnlySection/textOnlySection';
import SocialsSection from '@/components/home/socialsSection/socialsSection';
import GlobalLayout from './global-layout';

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
        <Banner />
        <TextSection />
        {twoColumns.map((item, index) => (
          <TwoColumn key={index} data={item} />
        ))}
        <ShowCase />
        <CardSection />
        <SecurityInsurance />
        <SocialsSection />
        <TextOnlySection />
      </GlobalLayout>
    </>
  );
}

const twoColumns = [
  {
    flexDirection: 'rowReverse',
    text: {
      subHeading: 'END-TO-END EVALUATION',
      subHeadingColor: '#25a4ff',
      heading: 'Build in a weekend, validate in minutes.',
      description:
        "Measure which prompts and models give the best end-to-end performance using Confident AI's evaluation suite.",
    },
    imageUrl: 'img/twoColumn-1.png',
    imageAlt: 'Support Illustration',
  },
  {
    flexDirection: 'row',
    text: {
      subHeading: 'REGRESSION TESTING',
      subHeadingColor: '#ff4aad',
      heading: 'Make forward progress. Always.',
      description:
        'Mitigate LLM regressions by running unit tests in CI/CD pipelines. Go ahead and deploy on Fridays.',
    },
    imageUrl: 'img/twoColumn-2.png',
    imageAlt: 'Support Illustration',
  },
  {
    flexDirection: 'rowReverse',
    text: {
      subHeading: 'COMPONENT-LEVEL EVALUATION',
      subHeadingColor: '#ffd900',
      heading: 'Dissect, debug, and iterate with tracing.',
      description:
        'Evaluate and apply tailored metrics to individual components, to pinpoint weaknesses in your LLM pipeline.',
    },
    imageUrl: 'img/twoColumn-3.png',
    imageAlt: 'Support Illustration',
  },
];
