import styles from './styles.module.scss'
export default function Banner() {
    return (
        <>
            <div className={styles.Banner}>
                <div className={styles.inner}>
                    <div className={styles.textWrap}>
                        <h1 className={styles.heading}>LLM Observability</h1>
                        <p className={styles.description}>Monitor, Trace, A/B Test, and get real-time production performance insights with best-in-class LLM Evaluations.</p>
                        <div className={styles.btnWrap}>
                            <a href="/" className={`${styles.btn} ${styles.contained}`}>
                                Request a Demo
                            </a>
                            <a href="/" className={`${styles.btn} ${styles.containedInverted}`}>
                                Try Now for free
                            </a>
                        </div>
                    </div>
                </div>
                <div className={styles.backgroundImage}>
                    <img src="/img/llm-obvserv-bg.svg" alt="screen of a browser displaying the llm evaluation feature of deep eval" />
                </div>
            </div>
            <div className={styles.BannerBottom}>
                <div className={styles.inner}>
                    <h2 className={styles.heading}>
                        Not Your Typical LLM Observability Solution
                    </h2>
                    <p className={styles.description}>
                        Confident AI's observability is evaluation-first, meaning you'll be able to automatically detect unsatisfactory responses with unparalleled accuracy using best-in-class LLM evaluations powered by DeepEval.
                    </p>
                </div>
            </div>
        </>
    );
}