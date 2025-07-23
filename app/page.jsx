import Banner from '@/components/Home/Banner/Banner';
import TextSection from '@/components/Home/TextSection/TextSection';
import TwoColumn from '@/components/Home/TwoColumn/TwoColumn';
import ShowCase from '@/components/Home/ShowCase/ShowCase';
import CardSection from '@/components/Home/CardSection/CardSection';
import SecurityInsurance from '@/components/Home/SecurityInsurance/SecurityInsurance';
import TextOnlySection from '@/components/Home/TextOnlySection/TextOnlySection';
import SocialsSection from '@/components/Home/SocialsSection/SocialsSection';
import GlobalLayout from './global-layout';

export const metadata = {
  title: 'Confident AI - The DeepEval LLM Evaluation Platform',
  description:
    'The DeepEval LLM evaluation platform to test, benchmark, safeguard, and improve LLM application performance, with best-in-class metrics and guardrails.',
  metadataBase: 'https://confident-ai.com', 
  openGraph: {
    title: 'Confident AI - The DeepEval LLM Evaluation Platform',
    description:
      'Test, benchmark, safeguard, and improve LLM application performance using DeepEval by Confident AI.',
    url: 'https://confident-ai.com',
    siteName: 'Confident AI',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Confident AI - The DeepEval LLM Evaluation Platform',
    description:
      'The DeepEval LLM evaluation platform to test, benchmark, safeguard, and improve LLM application performance.',
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
