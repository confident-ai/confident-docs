import styles from './styles.module.scss'
export default function TextOnlySection() {
    return (
        <div className={styles.TextOnlySection}>
            <div className={styles.inner}>
                <h2 className={styles.heading}>Get started today.</h2>
                <div className={styles.buttonWrap}>
                    <a
                        href='https://www.confident-ai.com/book-a-demo'
                        className={`${styles.btn} ${styles.outlined}`}
                    >
                        Request a Demo
                    </a>
                    <a
                        href='https://app.confident-ai.com/auth/signup?redirect_url=%2F'
                        className={`${styles.btn} ${styles.contained}`}
                    >
                        Try Now For Free
                    </a>
                </div>
            </div>
        </div>
    );
};