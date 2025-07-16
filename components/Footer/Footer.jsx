import styles from "./styles.module.scss";
import Image from "next/image";
import links from "@/app/links.js";

export default function Footer({ variant }) {
  const socials = [
    {
      link: "https://www.linkedin.com/company/confident-ai/",
      icon: "/icons/linkedIn-icon-grayed.png",
      alt: "Linked In",
    },
    {
      link: "https://github.com/confident-ai/deepeval",
      icon: "/icons/github-icon-grayed.png",
      alt: "Github icon",
    },
    {
      link: "https://discord.com/invite/a3K9c8GRGt",
      icon: "/icons/discord-icon-grayed.png",
      alt: "Discord Icon",
    },
    {
      link: "https://x.com/confident_ai",
      icon: "/icons/x-icon-grayed.png",
      alt: "X Icon",
    },
  ];
  return (
    <div className={`${styles.footer} ${styles[variant]}`}>
      <div className={styles.layout}>
        <div className={styles.inner}>
          <div className={styles.logoWrap}>
            <div className={styles.first}>
              <div className={styles.logo}>
                <Image
                  src={variant === 'light' ? "/icons/logo-without-border-black.svg" : "/icons/logo-without-border.svg"}
                  width={32}
                  height={32}
                  alt='alt="White bowtie with confident AI written on the right side"'
                />
                <span className={styles.span}>Confident AI</span>
              </div>
              <span className={styles.copyright}>
                Copyright @ 2025 Confident AI Inc. All rights reserved.
              </span>
              <div className={styles.socials}>
                {socials.map((social, idx) => (
                  <a key={idx} className={styles.social} href={social.link}>
                    <img src={social.icon} alt={social.alt} />
                  </a>
                ))}
              </div>
              <div className={styles.codeEmbedded}>
                <iframe
                  src="https://status.confident-ai.com/badge?theme=dark"
                  width="182"
                  height="30"
                  frameBorder="0"
                  scrolling="no"
                ></iframe>
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
                <h4 className={styles.title}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h4>
                <div className={styles.list}>
                  {items?.map(item => (
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
    </div>
  );
}
