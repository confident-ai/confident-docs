import styles from "./styles.module.scss";
import { Star } from "lucide-react";
export default function Callout({ theme = 'deepEval' }) {
  return (
    <div className={`${styles.ctaWrap} ${styles[theme]}`}>
      <div className={styles.cta}>
        <span className={styles.subHeading}>Presenting...</span>
        <div className={styles.headingImg}>
          <img src={ theme === 'deepEval' ? "/icons/deepEval-Text.svg" : "/icons/deepTeam-Text.svg"} alt="Deep Eval" />
        </div>
        <p className={styles.description}>
          {theme === 'deepEval' ? 'The open-source LLM evaluation framework.' : 'The open-source LLM red teaming framework.'}
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
