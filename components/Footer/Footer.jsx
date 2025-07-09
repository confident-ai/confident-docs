import styles from './styles.module.scss';
import Image from 'next/image';

export default function Footer({ variant, links}) {
    const socials = [
        {
            link: 'https://www.linkedin.com/company/confident-ai/',
            icon: 'icons/linkedIn-icon-grayed.png',
        },
        {
            link: 'https://github.com/confident-ai/deepeval',
            icon: 'icons/github-icon-grayed.png',
        },
        {
            link: 'https://discord.com/invite/a3K9c8GRGt',
            icon: 'icons/discord-icon-grayed.png',
        },
        {
            link: 'https://x.com/confident_ai',
            icon: 'icons/x-icon-grayed.png',
        },
    ]
    return (
        <div className={`${styles.footer} ${styles[variant]}`}>
            <div className={styles.inner}>
                <div className={styles.logoWrap}>
                    <div className={styles.first}>
                        <div className={styles.logo}>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnssvgjs="http://svgjs.com/svgjs" version="1.1" width="32" height="32" x="0" y="0" viewBox="0 0 512 512" xmlSpace="preserve"><g><path d="M0 130.247V381.73c0 2.904 2.458 5.191 5.356 5.005 59.688-3.821 123.532-24.779 168.612-66.136v-49.562h-65.679c-8.102 0-15.071-6.231-15.444-14.325-.398-8.635 6.484-15.749 15.021-15.749h66.103v-49.572c-44.828-41.139-108.672-62.34-168.614-66.149C2.457 125.058 0 127.344 0 130.247zM338.032 191.401v49.562h65.674c8.094 0 15.061 6.216 15.448 14.3.413 8.635-6.475 15.774-15.019 15.774h-66.103v49.572c44.828 41.139 108.673 62.34 168.614 66.149 2.897.184 5.354-2.102 5.354-5.005V130.27c0-2.904-2.458-5.19-5.356-5.005-59.843 3.829-123.609 24.831-168.612 66.136zM204.042 197.967v116.066h103.916V197.967H204.042z" fill="#ffffff" data-original="#000000" opacity="1"/></g></svg>
                            <span className={styles.span}>Confident AI</span>

                        </div>
                        <span className={styles.copyright}>Copyright @ 2025 Confident AI Inc. All rights reserved.</span>
                        <div className={styles.socials}>
                            {socials.map((social, idx) => (
                                <a key={idx} className={styles.social} href={social.link}>
                                    <img src={social.icon} />
                                </a>
                            ))}
                        </div>
                        <div className={styles.codeEmbedded}>
                            <iframe src="https://status.confident-ai.com/badge?theme=dark" width="182" height="30" frameBorder="0" scrolling="no"></iframe>
                        </div>
                    </div>
                    <div className={styles.compliances}>
                        <Image
                            src="/img/HIPAA.png"
                            alt="HIPAA Compliant"
                            width={140}
                            height={140}
                            className={styles.complianceBadge}
                        />
                        <Image
                            src="/img/SOC2.png"
                            alt="SOC II Compliant"
                            width={140}
                            height={140}
                            className={styles.complianceBadge}
                        />
                    </div>
                </div>
                <div className={styles.linkWrap}>
                    {Object.entries(links).map(([category, items]) => (
                        <div key={category} className={styles.column}>
                            <h4 className={styles.title}>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                            <div className={styles.list}>
                                {items?.map((item) => (
                                    <a key={item.name} href={item.url} className={styles.link}>
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}