import styles from './styles.module.scss'
export default function TwoColumn({ data }) {
    return (
        <div className={`${styles.TwoColumn}`}>
            <div className={`${styles.inner} ${styles[data?.flexDirection]}`}>
                <div className={styles.textWrap}>
                    <h2 className={styles.heading}>{data?.text?.heading}</h2>
                    <p className={styles.description}>{data?.text?.description}</p>
                </div>
                <div className={styles.videoWrap}>
                    <video autoPlay loop muted playsInline preload="auto">
                        <source src={data?.video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    );
};
