import Image from "next/image";
import styles from "./styles.module.scss";
import Button from "@/components/Button/Button";
export default function OpenPositions() {
  const Positions = [
    {
      shortForm: "OGSE",
      title: (
        <>
          Founding Open-Source
          <br className={styles.breakLine} /> Growth Engineer
        </>
      ),
      tags: "Engineering & Marketing",
      salary: "$100,000-200,000k USD (+lots of equity)",
      location: "US or Remote",
      jobDescription: {
        about: [
          <>
            Working on{" "}
            <a
              href="https://github.com/confident-ai/deepeval"
              target="_blank"
              rel="noopener noreferrer"
            >
              DeepEval
            </a>{" "}
            (most used package for LLM evaluation in the world) for both LLM
            evaluation features and also LLM red teaming features.
          </>,
          "Write high quality content around what you’ve built in the form of documentation and blog articles for the open-source community.",
          "Maintain and support integrations with other open-source projects.",
          "Support our open-source community for any questions and help they might need.",
        ],
        requirements: [
          "Read papers, and have a natural curiosity for new research.",
          "Write clearly, and is an avid reader.",
          "Code proficiently and quickly in Python and Typescript.",
          "Work 6 days a week, we’re not hiding we expect a lot from you.",
        ],
        responsibilities: [
          "Be used by hundreds of thousands of open-source users, all the way from individual hobbyist to AI leaders at Fortune 500 companies.",
          "Educate hundreds of thousands of people, that wouldn’t otherwise know how to quality assure their LLM applications.",
          "Be respected and appreciated by the community.",
        ],
        perks: [
          "Be shaping the future of LLM testing and evaluation.",
          "Learn how to run and do startups, in a relatively safe environment.",
          "Work closely with the founders, with the possibly of promotion to an executive role in the future.",
          "Be compensated highly, with generous founding equity. This also means that we expect a lot from you.",
        ],
      },
    },
    {
      shortForm: "FIE",
      title: (
        <>
          Founding Fullstack
          <br className={styles.breakLine} /> (Infrastructure) Engineer
        </>
      ),
      tags: "Engineering",
      salary: "$100,000-200,000k USD (+lots of equity)",
      location: "US or Remote",
      jobDescription: {
        about: [
          <>
            Working on Confident AI, the{" "}
            <a
              href="https://github.com/confident-ai/deepeval"
              target="_blank"
              rel="noopener noreferrer"
            >
              DeepEval
            </a>{" "}
            cloud platform.
          </>,
          "Scale Confident AI's backend infrastructure to process millions of evaluations a month.",
          "Deploying Confident AI on-premises for enterprises.",
          "Support our closed-source customers and help them with anything they might need.",
          "Occasionally, write interesting content around how you're scaling Confident AI's systems for the developer community.",
        ],
        requirements: [
          "Write SQL, and be an expert in scaling relational database systems (PostgresQL).",
          "Dockerize distributed, and have experience working with the AWS services such as EKS.",
          "Conduct on-premise deployments in our customers' cloud providers such as AWS, Azure, and GCP.",
          "Work with multi-tenant (authentication) systems.",
          "Follow best data practices to ensure we remain SOCII and HIPAA complied.",
          "Code proficiently and quickly in Python and Typescript.",
          "Work 6 days a week, we're not hiding we expect a lot from you.",
        ],
        responsibilities: [
          "Be used by hundreds of engineering teams, all the way from individual developers to Fortune 500 companies.",
          "Enable hundreds of engineering teams to gain instantly visibility into the performance of their LLM applications that wouldn't otherwise be possible.",
          "Make DeepEval even more popular (counter-intuitively).",
          "Be respected and appreciated by our customers.",
        ],
        perks: [
          "Bring LLM testing and evaluation to the largest companies available.",
          "Learn how to serve enterprise customers as a startup, in a relatively safe environment.",
          "Work closely with the founders, with the possibly of promoted to an executive role in the future.",
          "Be compensated highly, with generous founding equity. This also means that we expect a lot from you.",
        ],
      },
    },
  ];
  return (
    <div className={styles.openPositions}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>Open Positions</h2>
        <div className={styles.container}>
          {Positions.map((job, idx) => (
            <div className={styles.jobCard} key={idx}>
              <h3 className={styles.jobHeading}>{job.title}</h3>
              <div className={styles.infoWrap}>
                <div className={styles.workingLocation}>
                  <Image
                    src="/icons/location.svg"
                    width={18}
                    height={18}
                    alt="icon showing a gps marker"
                  />
                  <span className={styles.text}>{job.location}</span>
                </div>
                <span className={styles.dot}>•</span>
                <div className={styles.salary}>
                  <Image
                    src="/icons/money-bag.svg"
                    width={18}
                    height={18}
                    alt="icon showing a bag of money"
                  />
                  <span className={styles.text}>{job.salary}</span>
                </div>
                <span className={styles.dot}>•</span>
                <div className={styles.tags}>
                  <Image
                    src="/icons/appartments.svg"
                    width={18}
                    height={18}
                    alt="appartments icon"
                  />
                  <span className={styles.text}>{job.tags}</span>
                </div>
              </div>
              <div className={styles.jobDescription}>
                <div className={styles.section}>
                  <h4>What you’ll be doing:</h4>
                  <ul>
                    {job.jobDescription.about.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.section}>
                  <h4>You should be able to:</h4>
                  <ul>
                    {job.jobDescription.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.section}>
                  <h4>Your work will:</h4>
                  <ul>
                    {job.jobDescription.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.section}>
                  <h4>By joining us, you will:</h4>
                  <ul>
                    {job.jobDescription.perks.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                to={`mailto:hiring@confident-ai.com?subject=Interested%20in%20${job.shortForm}`}
                variant="contained"
                sizes="sm"
                bordered
                style={{ lineHeight: "1.8666667" }}
                label={
                  <>
                    Apply by emailing your resume to hiring@confident-ai.com
                    (Titled "Interested in {job.shortForm}")
                  </>
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
