"use client";
import styles from "./styles.module.scss";
import { Navbar } from "nextra-theme-docs";
import Logo from "@/components/Logo/Logo";
import GitHubButton from "@/components/GitHubButton/GitHubButton";
import SignUpButton from "@/components/SignUpButton";
import Button from "@/components/Home/Button/Button";
import { useState } from "react";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CustomNavbar = ({ isDocsPage }) => {
  const [active, setActive] = useState();
  const navLinks = [
    {
      label: "Products",
      children: [
        {
          label: "LLM Evaluation",
          href: "/products/llm-evaluation",
          description:
            "Benchmark LLM systems to optimize on prompts, models, and catch regressions with metrics powered by DeepEval.",
        },
        {
          label: "LLM Observability",
          href: "/products/llm-observability",
          description:
            "Monitor, Trace, A/B Test, and get real-time production performance insights with best-in-class LLM Evaluations.",
        },
      ],
    },
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Careers", href: "/careers" },
  ];


  if(isDocsPage){
    return(
      <Navbar
      logo={<Logo />}
      projectLink="https://github.com/confident-ai/deepeval"
      projectIcon={<GitHubButton />}
      // chatLink="https://discord.gg/Up3gbNTF"
    >
      <SignUpButton />
    </Navbar>
    )
  }

  return (
    <div className={`${styles.NewHeader} ${active ? styles.active : ""}`}>
      <div className={styles.inner}>
        <div className={styles.logoWrap}>
          <Image
            src="/icons/logo-without-border.svg"
            alt="White bowtie with confident AI written on the right side"
            width={32}
            height={32}
            priority
          />
          <span className={styles.span}>Confident AI</span>
        </div>
        <div className={`${styles.linkWrap} ${active ? styles.active : ""}`}>
          <div className={styles.nav}>
            {navLinks.map(link =>
              link.children ? (
                <div className={styles.navItemWithPopover} key={link.label}>
                  <span className={styles.navLink}>{link.label}</span>
                  <div className={styles.arrow}>
                    <Image src='/icons/arrow-down.svg' width={10} height={10} alt='downwards facing arrow'/>
                  </div>
                  <div className={styles.popover}>
                    <div className={styles.inner}>
                      {link.children.map(child => (
                        <Link href={child.href} key={child.label}>
                          <div className={styles.popoverLink}>
                            <span className={styles.childLinkHeading}>
                              {child.label}
                            </span>
                            <p className={styles.childLinkDescription}>
                              {child.description}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link href={link.href} key={link.label}>
                  <span className={styles.navLink}>{link.label}</span>
                </Link>
              )
            )}
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <Link
            href="https://github.com/confident-ai/deepeval"
            className={styles.githubButton}
          >
            <div className={styles.githubIconContainer}>
              <Image src='/icons/github-inverted.svg' width={18} height={18} alt='github logo'/>
            </div>
            <span>8.0k+</span>
            <Star size={20} fill="#ffc107" />
            <span>DeepEval</span>
          </Link>
          <div className={styles.loginBtn}>

            <Button
              to="https://app.confident-ai.com/auth/signup?redirect_url=%2F"
              variant="outlined"
              color="purple"
              label="Login"
              sizes="xs"
              curved
              bordered
              style={{
                borderWidth: '1px',
                fontWeight: '500',
                fontSize: '13px,'
              }}
            />
          </div>
          <div
            className={`${styles.dropDownBtn} ${active ? styles.active : ""}`}
            onClick={() => setActive(!active)}
          >
            <span className={styles.bar1}></span>
            <span className={styles.bar2}></span>
            <span className={styles.bar3}></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomNavbar;
