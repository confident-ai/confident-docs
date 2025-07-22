import styles from "./styles.module.scss";
export default function ArticleHeader() {
  return (
    <>
      <div className={styles.articleAuthor}>
        <div className={styles.profilePicture}>
          <img src="" alt="Author Pfp" />
        </div>
        <div className={styles.infoWrap}>
          <span className={styles.username}>Jeffrey Ip</span>
          <p className={styles.about}>
            Cofounder @ Confident AI, creator of DeepEval & DeepTeam. Working
            overtime to enforce responsible AI, with an unhealthy LLM evals
            addiction. Ex-Googler (YouTube), Microsoft AI (Office365).
          </p>
        </div>
      </div>
      <div className={styles.wrap}>
        <div className={styles.articleTitle}>
          <h1>
            LLM Arena-as-a-Judge: LLM-Evals for Comparison-Based Regression
            Testing
          </h1>
        </div>
        <div className={styles.articleMeta}>
          <span className={styles.publishDate}>July 7, 2025</span>
          <span className={styles.seperator}>.</span>
          <span className={styles.readTime}>10 min read</span>
        </div>
      </div>
    </>
  );
}
