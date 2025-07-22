import Image from "next/image";
import styles from "./styles.module.scss";
import Button from "@/components/Button/Button";
import Link from "next/link";

export default function Feature() {
  const features = [
    "Regression test and evaluate LLM apps.",
    "Easily A|B test prompts and models.",
    "Edit and manage datasets on the cloud.",
    "LLM observability with online evals.",
    "Publicly sharable testing reports.",
    "Automated human feedback collection.",
  ];
  return (
    <div className={styles.feature}>
      <div className={styles.inner}>
        <div className={styles.imageWrap}>
          <Image src="/icons/logo.png" width={150} height={150} />
        </div>
        <div className={styles.textWrap}>
          <h2>Confident AI: The DeepEval LLM Evaluation Platform</h2>
          <p>
            The leading platform to evaluate and test LLM applications on the
            cloud, native to DeepEval.{" "}
          </p>
          <div className={styles.features}>
            {features.map((feature, index) => (
              <div className={styles.featureItem} key={index}>
                <span className={styles.check}>
                  <Image src="/icons/checkmark.png" width={18} height={18} />
                </span>
                <span className={styles.text}>{feature}</span>
              </div>
            ))}
          </div>
          <div className={styles.btnWrap}>
            <Button
              to="https://app.confident-ai.com/auth/signup"
              variant="contained"
              sizes="xl"
              color="purple200"
              label="Try Now for Free"
              style={{ borderRadius: "8px", boxShadow: " 0 2px 5px #0000006b" }}
            />
            <Link
              className={styles.ctaLink}
              href="https://github.com/confident-ai/deepeval"
            >
              Checkout DeepEval
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
