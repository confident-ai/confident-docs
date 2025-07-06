import Banner from '@/components/Home/Banner/Banner'
import TextSection from '@/components/Home/TextSection/TextSection'
import TwoColumn from '@/components/Home/TwoColumn/TwoColumn'
import CardSection from '@/components/Home/CardSection/CardSection'
import SecurityInsurance from '@/components/Home/SecurityInsurance/SecurityInsurance'
import TextOnlySection from '@/components/Home/TextOnlySection/TextOnlySection'
import Marquee from '@/components/Home/Marquee/Marquee';


export default function HomePage() {
  return (
    <>
      <Banner data={bannerData} />
      <Marquee />
      <TextSection data={textSectionData} />
      {twoColumns.map((item, index) => (
        <TwoColumn key={index} data={item} />
      ))}
      <CardSection data={cardSectionData} />
      <SecurityInsurance data={securityInsuranceData} />
      <CardSection data={socialsCard} />
      <TextOnlySection data={textOnlySectionData}/>
    </>
  )
}

const bannerData = {
  heading: (
    <>
      The LLM <span className="underline" style={{ color: '#6e00ff', textDecoration: 'underline' }}>Evaluation</span> & Observability Platform for DeepEval
    </>
  ),
  description: "Built by the creators of DeepEval, engineering teams use Confident AI to benchmark, safeguard, and improve LLM applications, with best-in-class metrics and tracing.",
  buttons: [
    { txt: "Request a Demo", link: "https://www.confident-ai.com/book-a-demo", variant: "outlined" },
    { txt: "Try Now For Free", link: "https://app.confident-ai.com/auth/signup?redirect_url=%2F", variant: "contained" }
  ],
  image: {
    url: 'img/banner/bannerImage.png',
    alt: "Illustration showing productivity and teamwork"
  }
};

const textSectionData = {
  text: {
    subHeading: "USE CASES",
    subHeadingColor: "#ffb62e", // or use "var(--purple-accent)" if CSS variables are supported
    heading: (
      <>
        Build your AI moat.<br />
        Do evals the right way.
      </>),
    description: (
      <>
        Confident AI provides an opinionated solution to curate dataset, align metrics, and automate LLM testing with tracing. <br/>
        Teams use it to safeguard AI systems to <b>save hundreds of hours a week</b> on fixing breaking changes, <b> cut inference <br/>
        cost by 80%</b>, and convince stakeholders that their AI is always better than the week before.
      </>
    ),
  },
  buttons: [
    {
      txt: "READ CASE STUDY",
      link: "https://confident-ai.com/case-study/supernormal",
      variant: "contained", // styled as filled button
    },
    {
      txt: "TRY IT NOW",
      link: "https://documentation.confident-ai.com",
      variant: "outlined", // styled as outlined button
    },
  ],
};
const textOnlySectionData = {
  text: {
    heading: 'Get started today.',
  },
  buttons: [
    { txt: "Request a Demo", link: "https://www.confident-ai.com/book-a-demo", variant: "outlined" },
    { txt: "Try Now For Free", link: "https://app.confident-ai.com/auth/signup?redirect_url=%2F", variant: "contained" }
  ],
};
const twoColumns = [
  {
    flexDirection: 'rowReverse',
    text: {
      subHeading: 'END-TO-END EVALUATION',
      subHeadingColor: '#25a4ff',
      heading: 'Build in a weekend, validate in minutes.',
      description: "Measure which prompts and models give the best end-to-end performance using Confident AI's evaluation suite.",
    },
    imageUrl: 'img/twoColumn-1.png',
    imageAlt: 'Support Illustration'
  },
  {
    flexDirection: 'row',
    text: {
      subHeading: 'REGRESSION TESTING',
      subHeadingColor: '#ff4aad',
      heading: 'Make forward progress. Always.',
      description: 'Mitigate LLM regressions by running unit tests in CI/CD pipelines. Go ahead and deploy on Fridays.'
    },
    imageUrl: 'img/twoColumn-2.png',
    imageAlt: 'Support Illustration'
  },
  {
    flexDirection: 'rowReverse',
    text: {
      subHeading: 'COMPONENT-LEVEL EVALUATION',
      subHeadingColor: '#ffd900',
      heading: 'Dissect, debug, and iterate with tracing.',
      description: 'Evaluate and apply tailored metrics to individual components, to pinpoint weaknesses in your LLM pipeline.'
    },
    imageUrl: 'img/twoColumn-3.png',
    imageAlt: 'Support Illustration'
  },
];
const showCaseData = {
  text: {
    subHeading: "DEEPEVAL AND PLATFORM",
    subHeadingColor: "#02e2ff", // purple accent
    heading: (
      <>
        Built for developers.<br /> Used by everyone to drive product decisions.
      </>
    ),
    description:
      "Easily integrate evals using DeepEval, with intuitive product analytic dashboards for non-technical team members.",
  },
};
const cardSectionData = {
  text: {
    subHeading: "How It Works",
    subHeadingColor: "#fff86c", // Customize as needed
    heading: (
      <>
        Four steps to setup.<br />
        No credit card required.
      </>
    ),
  },
  cards: [
    {
      cardHeading: "Install DeepEval.",
      cardDescription:
        "Whatever framework you're using, just install DeepEval.",
    },
    {
      cardHeading: "Choose metrics.",
      cardDescription:
        "30+ LLM-as-a-judge metrics based on your use case.",
    },
    {
      cardHeading: "Plug it in.",
      cardDescription:
        "Decorate your LLM app to apply your metrics in code.",
    },
    {
      cardHeading: "Run an evaluation.",
      cardDescription:
        "Generate test reports to catch regressions and debug with traces.",
    },
  ],
  buttons: [
    {
      txt: "GO TO QUICK START",
      link: "https://documentation.confident-ai.com/getting-started/create-account",
      variant: "contained",
    },
  ],
};
const socialsCard = {
  text: {
    subHeading: "OPEN-SOURCE COMMUNITY",
    subHeadingColor: "#7a14ff", // Customize as needed
    heading: (
      <>
        100,000+ devs already do evals the<br />
        Confident way.
      </>
    ),
  },
  cards: [
    {
      icon: (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="50" height="50" x="0" y="0" viewBox="0 0 128 128" xmlSpace="preserve"><g><path d="M45.23 57.2c-6.16 0-11.17 5.6-11.17 12.48s5 12.47 11.17 12.47 11.16-5.59 11.16-12.47S51.38 57.2 45.23 57.2zm0 21c-4 0-7.17-3.8-7.17-8.47s3.21-8.48 7.17-8.48 7.16 3.8 7.16 8.48-3.21 8.42-7.16 8.42z" fill="#fefefe" opacity="1" data-original="#000000" /><path d="M121.83 59.58a156.78 156.78 0 0 0-11.52-31 2.1 2.1 0 0 0-.71-.77 87.08 87.08 0 0 0-15.23-7.17C84.55 17.07 79.91 17 79.72 17a2 2 0 0 0-2 1.72l-.6 4.17a133.14 133.14 0 0 0-26.28 0l-.6-4.17a2 2 0 0 0-2-1.72c-.19 0-4.83 0-14.65 3.61a87.08 87.08 0 0 0-15.19 7.2 2.1 2.1 0 0 0-.71.77 156.72 156.72 0 0 0-11.52 31C1 80.46 0 90.91 0 91.34a2 2 0 0 0 .49 1.5 55.2 55.2 0 0 0 18.2 12.74A76.32 76.32 0 0 0 38.48 111a2 2 0 0 0 1.92-1l5.4-9.25a105.08 105.08 0 0 0 18.2 1.49 105.08 105.08 0 0 0 18.2-1.51l5.4 9.27a2 2 0 0 0 1.72 1h.2a76.32 76.32 0 0 0 19.78-5.38 55.2 55.2 0 0 0 18.2-12.74 2 2 0 0 0 .49-1.5c.01-.47-.94-10.92-6.16-31.8zm-14.06 42.31a76.76 76.76 0 0 1-17.39 4.92l-4.08-7c4.68-1.24 14.42-4.46 21.83-11.2a2 2 0 1 0-2.69-3c-9 8.23-22.46 10.84-22.6 10.87h-.06A96.59 96.59 0 0 1 64 98.24a96.59 96.59 0 0 1-18.78-1.7h-.06c-.14 0-13.55-2.64-22.6-10.87a2 2 0 1 0-2.69 3c7.41 6.74 17.15 10 21.83 11.2l-4.08 7a76.08 76.08 0 0 1-17.39-4.92A52.24 52.24 0 0 1 4.08 90.8c.33-2.91 1.68-13.07 6-30.24A156.25 156.25 0 0 1 21 30.92a88.17 88.17 0 0 1 14-6.52 61.35 61.35 0 0 1 11.58-3.19l.35 2.39c-4 1-13.85 3.86-21.65 9.53a2 2 0 1 0 2.36 3.23c8.82-6.41 21-9.06 21.86-9.25a118.4 118.4 0 0 1 14.5-.84 117.64 117.64 0 0 1 14.51.84c.91.19 13 2.83 21.86 9.25a2 2 0 1 0 2.36-3.23c-7.8-5.67-17.61-8.52-21.65-9.53l.35-2.39A61.75 61.75 0 0 1 93 24.4a88.17 88.17 0 0 1 14 6.52 156.25 156.25 0 0 1 11 29.64c4.29 17.17 5.64 27.33 6 30.24a52.24 52.24 0 0 1-16.23 11.09z" fill="#fefefe" opacity="1" data-original="#000000" /><path d="M82.77 57.2c-6.15 0-11.16 5.6-11.16 12.48s5 12.47 11.16 12.47 11.17-5.59 11.17-12.47S88.93 57.2 82.77 57.2zm0 21c-4 0-7.16-3.8-7.16-8.47s3.21-8.48 7.16-8.48 7.17 3.8 7.17 8.48-3.21 8.42-7.17 8.42z" fill="#fefefe" opacity="1" data-original="#000000" /></g></svg>
        </>
      ),
      cardHeading: "Discord",
      socialLink: "https://discord.com/invite/a3K9c8GRGt",
      cardDescription:
        "2,500+ members",
    },
    {
      icon: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
          >
            <g>
              <path
                d="M14.5 23.862a.5.5 0 0 1-.5-.5v-3.72c0-.899-.115-1.537-.363-2.005a.5.5 0 0 1 .329-.72C16.93 16.233 19 14.064 19 11.642c0-1.2-.493-2.345-1.425-3.312a.5.5 0 0 1-.094-.558c.372-.802.293-1.894-.148-2.549-.583.228-1.34.705-1.832 1.289a.496.496 0 0 1-.554.147 8.67 8.67 0 0 0-5.893 0 .5.5 0 0 1-.554-.146c-.492-.584-1.249-1.061-1.833-1.289-.441.655-.52 1.747-.148 2.549a.498.498 0 0 1-.094.557C5.493 9.297 5 10.443 5 11.642c0 2.307 1.863 4.385 4.636 5.17a.501.501 0 0 1 .364.482v.349c0 .626-.251.979-.462 1.166-.452.397-1.036.337-1.1.33h-.01c-.824 0-1.444-.459-2.043-.903-.301-.223-.606-.45-.961-.638.077.104.153.211.23.318.75 1.043 1.599 2.226 2.847 2.226h1a.5.5 0 0 1 .5.5v2.72a.5.5 0 0 1-.608.488C3.95 22.642 0 17.719 0 12.142c0-6.617 5.383-12 12-12s12 5.383 12 12c0 5.576-3.95 10.5-9.392 11.708a.497.497 0 0 1-.108.012zm.258-6.121c.164.517.242 1.137.242 1.901v3.078c4.671-1.326 8-5.677 8-10.578 0-6.065-4.935-11-11-11s-11 4.935-11 11c0 4.901 3.329 9.252 8 10.578v-1.578h-.5c-1.76 0-2.813-1.465-3.659-2.643-.479-.667-.975-1.357-1.341-1.357a.5.5 0 0 1 0-1c1.74 0 2.705.715 3.48 1.29.536.397.958.71 1.52.71.056.003.263.018.379-.086.095-.086.119-.257.121-.392-3.006-.987-5-3.368-5-6.021 0-1.364.512-2.66 1.484-3.766-.429-1.243-.164-2.761.662-3.588a.494.494 0 0 1 .481-.13c.668.177 1.66.696 2.401 1.451a9.706 9.706 0 0 1 5.941 0c.741-.755 1.733-1.274 2.401-1.451a.493.493 0 0 1 .481.13c.827.827 1.091 2.345.662 3.587C19.488 8.983 20 10.279 20 11.642c0 2.728-2.127 5.17-5.242 6.099z"
                fill="#fefefe"
              />
            </g>
          </svg>
        </>
      ),
      cardHeading: "Github",
      socialLink: "https://github.com/confident-ai/deepeval",
      cardDescription:
        "8,000+ stars",
    },
    {
      icon: (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
          >
            <g>
              <path
                d="M20 3.5H4A2.503 2.503 0 0 0 1.5 6v12A2.503 2.503 0 0 0 4 20.5h16a2.503 2.503 0 0 0 2.5-2.5V6A2.503 2.503 0 0 0 20 3.5zM21.5 18a1.502 1.502 0 0 1-1.5 1.5H4A1.502 1.502 0 0 1 2.5 18V6A1.502 1.502 0 0 1 4 4.5h16A1.502 1.502 0 0 1 21.5 6zm-11.146-6.354a.5.5 0 0 1 0 .707l-4 4a.5.5 0 0 1-.707-.707L9.293 12 5.646 8.354a.5.5 0 0 1 .707-.707zM18.5 16a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1 0-1h6a.5.5 0 0 1 .5.5z"
                fill="#fefefe"
              />
            </g>
          </svg>
        </>
      ),
      cardHeading: "Docs",
      cardDescription:
        "100,000+ monthly reads",
      socialLink: 'https://documentation.confident-ai.com/docs',
    },
  ],
};
const securityInsuranceData = {
  text: {
    subHeading: "ENTERPRISE",
    subHeadingColor: "#ff7476",
    heading: <>
      Secure, reliable, and compliant. <br/>
      Your data, is yours.
    </>,
  },
  securities: [
    {
      icon: "/icons/compliant-icon.svg",
      iconColor: '#a0ffe9',
      heading: "HIPAA, SOCII compliant",
      description:
        "Our compliance standards meets the requirements of even the most regulated healthcare, insurance, and financial industries.",
    },
    {
      icon: "/icons/world-icon.svg",
      iconColor: '#ffe485',
      heading: "Multi-data residency",
      description:
        "Store and process data in the United States of America (North Carolina) or the European Union (Frankfurt).",
    },
    {
      icon: '/icons/lock-icon.svg',
      iconColor: '#ffafef',
      heading: "RBAC and data masking",
      description:
        "Our flexible infrastructure allows data separation between projects, custom permissions control, and masking for LLM traces.",
    },
    {
      icon: '/icons/uptime-icon.svg',
      iconColor: '#8deaff',
      heading: "99.9% uptime SLA",
      description:
        "We offer enterprise-level guarantees for our services to ensure mission critical workflows are always accessible.",
    },
    {
      icon: '/icons/hosting.svg',
      iconColor: '#d2b8ff',
      heading: "On-Prem Hosting",
      description:
        "Optionally deploy Confident AI in your cloud premises, may it be AWS, Azure, or GCP, with tailored hands-on support.",
    },
  ],
};