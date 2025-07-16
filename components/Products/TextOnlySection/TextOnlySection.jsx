import styles from './styles.module.scss'
export default function TextOnlySection() {
    return (
        <div className={styles.TextOnlySection}>
            <div className={styles.inner}>
                <h2 className={styles.heading}>The Future of AI Depends On <span>Confident AI</span> You.</h2>
                <div className={styles.buttonWrap}>
                    <a
                        href='https://www.confident-ai.com/book-a-demo'
                        className={`${styles.btn} ${styles.contained}`}
                    >
                        Request a Demo
                    </a>
                    <a
                        href='https://app.confident-ai.com/auth/signup?redirect_url=%2F'
                        className={`${styles.btn} ${styles.outlined}`}
                    >
                        Try Now For Free
                    </a>
                </div>
            </div>
        </div>
    );
};