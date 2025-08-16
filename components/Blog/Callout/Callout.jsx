import Image from "next/image";
import styles from "./styles.module.scss";
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
          <Image src="/icons/star.svg" alt="star" width={26} height={26} />
          Star on GitHub
        </a>
      </div>
    </div>
  );
}
