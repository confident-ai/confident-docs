import Banner from '@/components/Products/Banner/Banner'
import TwoColumn from '@/components/Products/TwoColumn/TwoColumn'
import TextOnlySection from '@/components/Products/TextOnlySection/TextOnlySection'
import GlobalLayout from '@/app/global-layout'

export const metadata = {
  title: 'LLM Evaulation',
  description: 'The DeepEval LLM evaluation platform to test, benchmark, safeguard, and improve LLM application performance, with best-in-class metrics and guardrails.',
};
export default function Page() {
  return (
    <>

      <GlobalLayout>
        <Banner
          heading="LLM Evaluation"
          description="Benchmark LLM systems to optimize on prompts, models, and catch regressions with metrics powered by DeepEval."
          image="/img/llm-eval-bg.svg"
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
          Easily <span>benchmark</span> LLM system performance
        </>,
      description:
        <>
          Confident AI generates testing reports for you to benchmark LLM applications on the criteria unique to your use case. Easily view metric distributions, perform data analysis on evaluation results, and identify areas to iterate your LLM application on.
          <br /><br />
          You can either benchmark your LLM system on the cloud or locally via DeepEval. Confident AI will generate testing reports for you for either option.
        </>,
    },
    video: 'https://confident-bucket.s3.us-east-1.amazonaws.com/monitoring-vid2.mp4',
  },
  {
flexDirection: 'row',
    text: {
      heading:
        <>
          Unit-test with <span>evaluation</span> metrics powered by DeepEval
        </>,
      description:
        <>
          Unit-test your LLM system like how you would unit-test deterministic software. This is made possible by best-in-class metrics powered by DeepEval, covering 14+ metrics and research-backed custom metrics for any use case, and can be included in CI/CD pipelines as well.
          <br /><br />
          Confident AI also offer debugging logs for these metrics, as well as tools for you to run data analysis on the accuracy of these metrics.
        </>,
    },
    video: 'https://confident-bucket.s3.us-east-1.amazonaws.com/catch-regressions-vid.mp4',
  },
  {
    flexDirection: 'rowReverse',
    text: {
      heading:
        <>
          Catch <span>regressions</span> to safeguard against breaking changes
        </>,
      description:
        <>
          Confident AI allows your team to catch regressions without breaking a sweat. With an end-to-end regression testing suite, you can seamlessly compare LLM system responses across different evaluation runs, and identify if for example a change in model results in worse-off performance in a certain criteria.
        </>,
    },
    video: 'https://confident-bucket.s3.us-east-1.amazonaws.com/test-cases-vid.mp4',
  },
  {
    flexDirection: 'row',
    text: {
      heading:
        <>
          Run <span>experiments</span> to compare and iterate on prompts and models
        </>,
      description:
        <>
          Version your prompts, and test which one performs best for your LLM system by running experiments. Experiments allow you to quantify how well each prompt is performing using evaluation metrics offered by DeepEval. You can also experiment with hyperparameters other than prompts, such as the LLM you're using for generation.
        </>,
    },
    video: 'https://confident-bucket.s3.us-east-1.amazonaws.com/compare-hyperparameters-vid.mp4',
  },
];


