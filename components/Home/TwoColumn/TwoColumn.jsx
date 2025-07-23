import styles from './styles.module.scss'
export default function TwoColumn ({ data }){
    return(
        <div className={`${styles.TwoColumn}`}>
            <div className={`${styles.inner} ${styles[data?.flexDirection]}`}>
                <div className={styles.textWrap}>
                    <span className={styles.subHeading} style={{ color: `${data?.text?.subHeadingColor}`}}>{data?.text?.subHeading}</span>
                    <h2 className={styles.heading}>{data?.text?.heading}</h2>
                    <p className={styles.description}>{data?.text?.description}</p>
                </div>
                <div className={styles.imageWrap}>
                    <img src={data?.imageUrl} alt={data?.imageAlt}/>
                </div>
            </div>
        </div>
    );
};
