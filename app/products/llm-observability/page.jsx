import Banner from '@/components/Products/Banner/Banner'

import TwoColumn from '@/components/Products/TwoColumn/TwoColumn'
import TextOnlySection from '@/components/Products/TextOnlySection/TextOnlySection'
import GlobalLayout from '@/app/global-layout'

export const metadata = {
  title: 'LLM Observability',
  description: "Confident AI LLM Observability provides end-to-end monitor & tracing of LLM applications in production with best-in-class evaluations powered by DeepEval.",
  openGraph: {
    title: 'LLM Observability',
    description:
      "Confident AI LLM Observability provides end-to-end monitor & tracing of LLM applications in production with best-in-class evaluations powered by DeepEval.",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LLM Observability',
    description:
      "Confident AI LLM Observability provides end-to-end monitor & tracing of LLM applications in production with best-in-class evaluations powered by DeepEval.",
  },
};
export default function Page() {
  return (
    <>

      <GlobalLayout>
        <Banner
          heading="LLM Observability"
          description="Monitor, Trace, A/B Test, and get real-time production performance insights with best-in-class LLM Evaluations."
          image="/img/llm-obvserv-bg.svg"
        />
        {twoColumnData.map((item, index) => (
          <TwoColumn key={index} data={item} />
        ))}
        <TextOnlySection/>
      </GlobalLayout>
    </>
  )
}

const twoColumnData = [
  {
    flexDirection: 'rowReverse',
    text: {
      heading:
        <>
          Easily <span>monitor</span> and A/B test LLM applications
        </>,
      description:
        <>
          Confident AI offers advanced logging for anyone to recreate scenarios in which monitored LLM responses were generated in, and allows you to easily A/B test different hyper-parameters for your LLM system in production (e.g. prompt template, models).
          <br /><br />
          Setting up monitoring typically takes less than 10 minutes of your time, and integrates with any systems via API calls through DeepEval.

        </>,
    },
    video: 'https://confident-bucket.s3.us-east-1.amazonaws.com/monitoring-vid2.mp4',
  },
  {
    flexDirection: 'row',
    text: {
      heading:
        <>
          Real-time LLM <span>evaluation</span> powered by DeepEval
        </>,
      description:
        <>
          Automatically grade incoming LLM response you're monitoring on Confident AI. These evaluations covers any use case, LLM systems (e.g. RAG, Chatbots, Agents), and can be enabled by a few clicks. Custom evaluation LLMs available on request.
          <br /><br />
          This allows you to safeguard against unwanted risks, and to be alerted of bad responses that might have been exposed to end users.
        </>,
    },
    video: 'https://confident-bucket.s3.us-east-1.amazonaws.com/real-time-evals-vid.mp4',
  },
  {
    flexDirection: 'rowReverse',
    text: {
      heading:
        <>
          Flexible LLM <span>tracing</span> to debug any LLM application
        </>,
      description:
        <>
          From retrieval data to accessing different APIs, Confident AI allows you to pinpoint where things have gone wrong through detailed tracing.
          <br /><br />
          One line tracing integrations are available for 5+ LLM frameworks such as LangChain, LlamaIndex, and custom tracing can be easily integrated to support LLM applications that are not built with any frameworks.
        </>,
    },
    video: 'https://confident-bucket.s3.us-east-1.amazonaws.com/tracing-vid.mp4',
  },
  {
    flexDirection: 'row',
    text: {
      heading:
        <>
          Collect user <span>feedback</span> to identify unsatisfactory interactions
        </>,
      description:
        <>
          Confident AI allows your team to either collect feedback from human annotators on the platform, OR directly from end users interacting with your LLM application via API calls.
          <br /><br />
          When combined with real-time evaluations, your team can easily identify the scenarios in which your LLM underperforms.
        </>,
    },
    video: 'https://confident-bucket.s3.us-east-1.amazonaws.com/tracing-vid.mp4',
  },
];

