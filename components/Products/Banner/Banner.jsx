import styles from './styles.module.scss'
import Link from 'next/link'
export default function Banner({ heading, description, image}) {
    return (
        <>
            <div className={styles.Banner}>
                <div className={styles.inner}>
                    <div className={styles.textWrap}>
                        <h1 className={styles.heading}>{heading}</h1>
                        <p className={styles.description}>{description}</p>
                        <div className={styles.btnWrap}>
                            <Link href="/book-a-demo" className={`${styles.btn} ${styles.contained}`}>
                                Request a Demo
                            </Link>
                            <Link href="https://app.confident-ai.com?utm_source=landing" className={`${styles.btn} ${styles.containedInverted}`}>
                                Try Now for free
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={styles.backgroundImage}>
                    <img src="/img/llm-eval-bg.svg" alt="screen of a browser displaying the llm evaluation feature of deep eval" />
                </div>
            </div>
            <div className={styles.BannerBottom}>
                <div className={styles.inner}>
                    <h2 className={styles.heading}>
                        Powered by Your Favorite LLM Evaluation Framework
                    </h2>
                    <p className={styles.description}>
                        Confident AI is powered by its proprietary open-source LLM evaluation framework DeepEval. With over 5 million evaluations ran, you'll be able to run evaluations with metrics that are proven to work, while still offering the flexibility to customize them to your needs.
                    </p>
                </div>
            </div>
        </>
    );
}