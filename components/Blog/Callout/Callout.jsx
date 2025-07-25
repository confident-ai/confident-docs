import styles from "./styles.module.scss";
import { Star } from "lucide-react";
export default function Callout({ theme = 'primary' }) {
  return (
    <div className={`${styles.ctaWrap} ${styles[theme]}`}>
      <div className={styles.cta}>
        <span className={styles.subHeading}>Presenting...</span>
        <div className={styles.headingImg}>
          <img src="/icons/deepEval-Text.svg" alt="Deep Eval" />
        </div>
        <p className={styles.description}>
          The open-source LLM evaluation framework.
        </p>
        <a
          href="https://github.com/confident-ai/deepeval"
          className={styles.githubBtn}
        >
          <Star fill="#ffc107" width={26} height={26} color='#000' />
          Star on GitHub
        </a>
      </div>
    </div>
  );
}
