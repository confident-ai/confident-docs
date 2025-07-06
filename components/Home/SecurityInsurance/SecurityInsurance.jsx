import Image from 'next/image';
import styles from './styles.module.scss'
export default function SecurityInsurance({ data }) {
    return (
        <div className={styles.SecurityInsurance}>
            <div className={styles.inner}>
                <div className={styles.textWrap}>
                    <span className={styles.subHeading} style={{ color: `${data?.text?.subHeadingColor}` }}>{data?.text?.subHeading}</span>
                    <h2 className={styles.heading}>{data?.text?.heading}</h2>
                    <div
                        className={`${styles.securities}`}>
                        {data?.securities?.map((security, idx) => (
                            <div key={idx} className={styles.security}>
                                <div className={styles.wrap}>
                                    <div className={styles.iconOuter}>
                                        <div className={styles.securityIcon} style={{ backgroundColor: `${security?.iconColor}`  }}>
                                            <Image src={security.icon} alt={security.heading} width={25} height={25} />
                                        </div>
                                    </div>
                                    <h3 className={styles.securityHeading}>
                                        {security.heading}
                                    </h3>
                                </div>
                                <p className={styles.securityDescription}>{security.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};