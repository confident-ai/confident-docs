"use client"

import Image from "next/image";
import styles from './styles.module.scss';
import GitHubButton from '@/components/GitHubButton/GitHubButton'
import { Star } from "lucide-react";
import { useState } from "react";

export default function NewHeader() {
    const [active, setActive] = useState();
    const navLinks = [
        {
            label: "Products",
            children: [
                { label: "LLM Evaluation", href: "/features", description: 'Benchmark LLM systems to optimize on prompts, models, and catch regressions with metrics powered by DeepEval.' },
                { label: "LLM Observability", href: "/integrations", description: 'Monitor, Trace, A/B Test, and get real-time production performance insights with best-in-class LLM Evaluations.' }
            ]
        },
        { label: "Blog", href: "/blog" },
        { label: "Documentation", href: "/docs" },
        { label: "Pricing", href: "/pricing" },
        { label: "Careers", href: "/careers" }
    ];

    return (
        <div className={`${styles.NewHeader} ${active ? styles.active : ''}`}>
            <div className={styles.inner}>
                <div className={styles.logoWrap}>
                    <Image
                        src="icons/logo-without-border.svg"
                        alt="White bowtie with confident AI written on the right side"
                        width={32}
                        height={32}
                        priority
                    />
                    <span className={styles.span}>Confident AI</span>
                </div>
                <div className={`${styles.linkWrap} ${active ? styles.active : ''}`}>
                    <div className={styles.nav}>
                        {navLinks.map((link) =>
                            link.children ? (
                                <div className={styles.navItemWithPopover} key={link.label}>
                                    <span className={styles.navLink} style={{ fontWeight: 500 }}>{link.label}</span>
                                    <svg width="16px" height="16px" viewBox="0 0 16 16" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M2.55806 6.29544C2.46043 6.19781 2.46043 6.03952 2.55806 5.94189L3.44195 5.058C3.53958 4.96037 3.69787 4.96037 3.7955 5.058L8.00001 9.26251L12.2045 5.058C12.3021 4.96037 12.4604 4.96037 12.5581 5.058L13.4419 5.94189C13.5396 6.03952 13.5396 6.19781 13.4419 6.29544L8.17678 11.5606C8.07915 11.6582 7.92086 11.6582 7.82323 11.5606L2.55806 6.29544Z" fill="#ffffff"></path>
                                    </svg>
                                    <div className={styles.popover}>
                                        <div className="inner">
                                            {link.children.map((child) => (
                                                <a
                                                    href={child.href}
                                                    className={styles.popoverLink}
                                                    key={child.label}
                                                >
                                                    <div>
                                                        <span className={styles.childLinkHeading}>{child.label}</span>
                                                        <p className={styles.childLinkDescription}>{child.description}</p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <a
                                    href={link.href}
                                    className={styles.navLink}
                                    key={link.label}
                                >
                                    {link.label}
                                </a>
                            )
                        )}
                    </div>
                </div>
                <div className={styles.buttonWrap}>
                    <div className={styles.githubButton}>
                        <div className={styles.githubIconContainer}>
                            <svg height="18" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="18" data-view-component="true">
                                <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z"></path>
                            </svg>
                        </div>
                        <span>8.0k+</span>
                        <Star size={16} fill="#ffdd00" />
                        <span>DeepEval</span>
                    </div>
                    <div className={styles.loginButton}>
                        <a href="https://app.confident-ai.com/auth/signup?redirect_url=%2F">
                            Login
                        </a>
                    </div>
                    <div className={`${styles.dropDownBtn} ${active ? styles.active : ''}`} onClick={() => setActive(!active)}>
                        <span className={styles.bar1}></span>
                        <span className={styles.bar2}></span>
                        <span className={styles.bar3}></span>

                    </div>
                </div>
            </div>
        </div>
    )
}