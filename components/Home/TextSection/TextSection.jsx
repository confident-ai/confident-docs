import styles from './styles.module.scss'
export default function TextSection({ data }) {
    return (
        <div className={styles.textSection}>
            <div className={styles.inner}>
                <div className={styles.textWrap}>
                    <span className={styles.subHeading} style={{ color: `${data?.text?.subHeadingColor}` }}>{data?.text?.subHeading}</span>
                    <h2 className={styles.heading}>{data?.text?.heading}</h2>
                    <p className={styles.description}>{data?.text?.description}</p>
                    <div className={styles.buttonWrap}>
                        {data?.buttons?.map((btn, i) => (
                            <a key={i} href={btn?.link} className={`${styles.btn} ${styles[btn?.variant]}`}>
                                {btn?.txt}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};