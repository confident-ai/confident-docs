import styles from './styles.module.scss'
export default function TextOnlySection({ data }) {
    return (
        <div className={styles.TextOnlySection}>
            <div className={styles.inner}>
                <h2 className={styles.heading}>{data?.text?.heading}</h2>
                <div className={styles.buttonWrap}>
                    {data?.buttons?.map((btn, i) => (
                        <a key={i} href={btn?.link} className={`${styles.btn} ${styles[btn?.variant]}`}>
                            {btn?.txt}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};