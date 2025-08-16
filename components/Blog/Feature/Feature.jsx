import Image from "next/image";
import styles from "./styles.module.scss";
import Button from "@/components/button/button";
import Link from "next/link";
import { text } from "stream/consumers";

export default function Feature({ theme = 'deepEval' }) {
  const features = {
    deepEval: [
      "Regression test and evaluate LLM apps.",
      "Easily A|B test prompts and models.",
      "Edit and manage datasets on the cloud.",
      "LLM observability with online evals.",
      "Publicly sharable testing reports.",
      "Automated human feedback collection.",
    ],
    deepTeam: [
      "Tailored frameworks (e.g. OWASP Top 10)",
      "10+ LLM guardrails to guard malicious I/O",
      "40+ plug-and-play vulnerabilities and 10+ attacks",
      "Guardrails accuracy and latency reporting",
      "Publicly sharable risk assessments.",
      "On-demand custom guards available.",
    ],
  };
  const selectedFeatures = features[theme] || [];

  return (
    <div className={`${styles.feature} ${styles[theme]}`}>
      <div className={styles.inner}>
        <div className={styles.imageWrap}>
          <Image
            src={
              theme === "deepEval"
                ? "/icons/confident-ai-logo.svg"
                : "/icons/deepTeam-logo.svg"
            }
            width={150}
            height={150}
            alt="Confident Ai Logo"
          />
        </div>
        <div className={styles.textWrap}>
          <div className={styles.heading}>
            <Image
              src={
                theme === "deepEval"
                  ? "/icons/confident-ai-logo.svg"
                  : "/icons/deepTeam-logo.svg"
              }
              width={80}
              height={80}
              alt="Confident Ai Logo"
              className={styles.logo}
            />
            <h2 className={styles[theme]}>
              {theme === "deepEval"
                ? "Confident AI: The DeepEval LLM Evaluation Platform"
                : "Got Red? Safeguard LLM Systems Today with Confident AI"}
            </h2>
          </div>
          <p className={styles.description}>
            {theme === "deepEval"
              ? "The leading platform to evaluate and test LLM applications on the cloud, native to DeepEval."
              : "The leading platform to red-team LLM applications for your organization, powered by DeepTeam."}
          </p>
          <div className={styles.features}>
            {selectedFeatures.map((feature, index) => (
              <div className={styles.featureItem} key={index}>
                <span className={styles.check}>
                  <Image
                    src="/icons/checkmark.png"
                    width={18}
                    height={18}
                    alt="checkmark"
                  />
                </span>
                <span className={styles.text}>{feature}</span>
              </div>
            ))}
          </div>
          <div className={styles.btnWrap}>
            <Button
              to={
                theme === "deepEval"
                  ? "https://app.confident-ai.com/auth/signup"
                  : "/book-a-demo"
              }
              variant="contained"
              sizes="xl"
              color={theme === "deepEval" ? "purple200" : "red200"}
              label={
                theme === "deepEval" ? "Try Now for Free" : "Request a Demo"
              }
              style={{
                borderRadius: "8px",
                boxShadow: " 0 2px 5px #0000006b",
                textDecoration: "none",
                lineHeight: "1.473686em",
              }}
            />
            <Link
              className={styles.ctaLink}
              href={
                theme === "deepEval"
                  ? "https://github.com/confident-ai/deepeval"
                  : "https://github.com/confident-ai/deepteam"
              }
            >
              {theme === "deepEval" ? "Checkout DeepEval" : "Checkout DeepTeam"}
              <svg
                width="18"
                height="18"
                viewBox="0 0 128 127"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M55.5 81L47.5 72.5L107 11.5H83V0H127.5V43H114.5V21.5L55.5 81Z"
                  fill="#003EAA"
                />
                <path
                  d="M88 64.5H101V127H0V26H62.5V37.5H12V115.5H88V64.5Z"
                  fill="#003EAA"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
