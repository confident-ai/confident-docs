"use client";
import styles from "./styles.module.scss";
import { Navbar } from "nextra-theme-docs";
import Logo from "@/components/mdxComponents/Logo/Logo";
import GitHubButton from "@/components/gitHubButton/gitHubButton";
import SignUpButton from "@/components/SignUpButton";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const CustomNavbar = ({ isDocsPage, staticHeader = false }) => {
  const [active, setActive] = useState();
  const [activatePopOver, setActivatePopOver] = useState(false);
  const popoverRef = useRef(null);
  
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
    { label: "Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Careers", href: "/careers" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!activatePopOver) return;
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setActivatePopOver(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [activatePopOver]);

  if (isDocsPage) {
    return (
      <Navbar
        logo={<Logo />}
        projectLink="https://github.com/confident-ai/deepeval"
        projectIcon={<GitHubButton asIcon={true} />}
        // chatLink="https://discord.gg/Up3gbNTF"
      >
        <SignUpButton />
      </Navbar>
    );
  }

  return (
    <div
      className={`${styles.NewHeader} ${
        staticHeader ? styles.staticHeader : ""
      } ${active ? styles.active : ""}`}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logoWrap}>
          <Image
            src="/icons/logo-without-border.svg"
            alt="White bowtie with confident AI written on the right side"
            width={32}
            height={32}
            priority
          />
          <span className={styles.span}>Confident AI</span>
        </Link>
        <div className={`${styles.linkWrap} ${active ? styles.active : ""}`}>
          <div className={styles.nav}>
            {navLinks.map(link =>
              link.children ? (
                <div
                  ref={popoverRef}
                  className={styles.navItemWithPopover}
                  key={link.label}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivatePopOver(!activatePopOver);
                  }}
                >
                  <span className={styles.navLink}>{link.label}</span>
                  <div
                    className={`${styles.arrow} ${
                      activatePopOver ? styles.active : ""
                    }`}
                  >
                    <Image
                      src="/icons/arrow-down.svg"
                      width={10}
                      height={10}
                      alt="downwards facing arrow"
                    />
                  </div>
                  <div
                    className={`${styles.popover} ${
                      activatePopOver ? styles.active : ""
                    }`}
                  >
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
          <GitHubButton darkMode={true} />
          <SignUpButton darkMode={true} />
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