import styles from './styles.module.scss'
export default function TextSection() {
    return (
        <div className={styles.textSection}>
            <div className={styles.inner}>
                <div className={styles.textWrap}>
                    <span className={styles.subHeading} style={{ color: '#ffb62e' }}>USE CASES</span>
                    <h2 className={styles.heading}>
                        Build your AI moat.<br />
                        Do evals the right way.
                    </h2>
                    <p className={styles.description}>
                        Confident AI provides an opinionated solution to curate dataset, align metrics, and automate LLM testing with tracing. <br />
                        Teams use it to safeguard AI systems to <b>save hundreds of hours a week</b> on fixing breaking changes, <b> cut inference <br />
                            cost by 80%</b>, and convince stakeholders that their AI is always better than the week before.
                    </p>
                    <div className={styles.buttonWrap}>
                        <a href='https://confident-ai.com/case-study/supernormal' className={`${styles.btn} ${styles.contained}`}>
                            READ CASE STUDY
                        </a>
                        <a href='https://documentation.confident-ai.com' className={`${styles.btn} ${styles.outlined}`}>
                            TRY IT NOW
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};