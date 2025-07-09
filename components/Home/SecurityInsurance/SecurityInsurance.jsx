import Image from 'next/image';
import styles from './styles.module.scss'
export default function SecurityInsurance( ) {
    const securities = [
        {
            icon: "/icons/compliant-icon.svg",
            iconColor: '#a0ffe9',
            heading: "HIPAA, SOCII compliant",
            description:
                "Our compliance standards meets the requirements of even the most regulated healthcare, insurance, and financial industries.",
        },
        {
            icon: "/icons/world-icon.svg",
            iconColor: '#ffe485',
            heading: "Multi-data residency",
            description:
                "Store and process data in the United States of America (North Carolina) or the European Union (Frankfurt).",
        },
        {
            icon: '/icons/lock-icon.svg',
            iconColor: '#ffafef',
            heading: "RBAC and data masking",
            description:
                "Our flexible infrastructure allows data separation between projects, custom permissions control, and masking for LLM traces.",
        },
        {
            icon: '/icons/uptime-icon.svg',
            iconColor: '#8deaff',
            heading: "99.9% uptime SLA",
            description:
                "We offer enterprise-level guarantees for our services to ensure mission critical workflows are always accessible.",
        },
        {
            icon: '/icons/hosting.svg',
            iconColor: '#d2b8ff',
            heading: "On-Prem Hosting",
            description:
                "Optionally deploy Confident AI in your cloud premises, may it be AWS, Azure, or GCP, with tailored hands-on support.",
        },
    ];

    return (
        <div className={styles.SecurityInsurance}>
            <div className={styles.inner}>
                <div className={styles.textWrap}>
                    <span className={styles.subHeading} style={{ color: '#ff7476' }}>ENTERPRISE</span>
                    <h2 className={styles.heading}>
                        Secure, reliable, and compliant. <br />
                        Your data, is yours.
                    </h2>
                    <div
                        className={`${styles.securities}`}>
                        {securities.map((security, idx) => (
                            <div key={idx} className={styles.security}>
                                <div className={styles.wrap}>
                                    <div className={styles.iconOuter}>
                                        <div className={styles.securityIcon} style={{ backgroundColor: `${security?.iconColor}` }}>
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