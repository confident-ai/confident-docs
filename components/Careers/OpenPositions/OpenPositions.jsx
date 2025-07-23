import Image from "next/image";
import styles from "./styles.module.scss";
import Button from "@/components/Button/Button";
export default function OpenPositions() {
  const Positions = [
    {
      shortForm: "OGSE",
      title: <>Founding Open-Source<br className={styles.breakLine}/>Growth Engineer</>,
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
      shortForm: "OGSE",
      title: "Founding Open-Source Growth Engineer",
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
                  <Image src="/icons/location.svg" width={18} height={18} alt="icon showing a gps marker" />
                  <span className={styles.text}>{job.location}</span>
                </div>
                <span className={styles.dot}>•</span>
                <div className={styles.salary}>
                  <Image src="/icons/money-bag.svg" width={18} height={18}  alt="icon showing a bag of money"/>
                  <span className={styles.text}>{job.salary}</span>
                </div>
                <span className={styles.dot}>•</span>
                <div className={styles.tags}>
                  <Image src="/icons/appartments.svg" width={18} height={18} alt="appartments icon"/>
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
                to={`https://mail.google.com/mail/u/0/?fs=1&to=hiring@confident-ai.com&su=Interested%20In%20${job.shortForm}&tf=cm`}
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
