"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import Marquee from "@/components/Home/Marquee/Marquee";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Button from "@/components/Button/Button";

export default function Banner() {
  const [hasAnimated, setHasAnimated] = useState(false);

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true, // ensures it only runs once
  });

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);

  const btns = [
    {
      label: "Request a Demo",
      link: "https://www.confident-ai.com/book-a-demo",
      btnVariant: "outlinedPurple",
    },
    {
      label: "Try Now For Free",
      link: "https://app.confident-ai.com/auth/signup?redirect_url=%2F",
      btnVariant: "containedBW",
    },
  ];

  return (
    <div className={styles.Banner}>
      <div className={styles.inner}>
        <div className={styles.backedBy}>
          <Image
            alt="Y Combinator company logo"
            src="/icons/brand-icons/ycombinator.svg"
            width={28}
            height={28}
          />
          <div className={styles.BackedByText}>
            <span>Backed by</span>Y Combinator
          </div>
        </div>

        <div className={styles.textWrap} ref={ref}>
          <h1
            className={`${styles.bannerHeading} ${
              hasAnimated ? styles.popUpText : ""
            }`}
          >
            The LLM{" "}
            <span
              className="underline"
              style={{ color: "#6e00ff", textDecoration: "underline" }}
            >
              Evaluation
            </span>{" "}
            & Observability Platform for DeepEval
          </h1>
          <p
            className={`${styles.bannerDescription} ${
              hasAnimated ? styles.fadeUp : ""
            }`}
          >
            Built by the creators of DeepEval, engineering teams use Confident
            AI to benchmark, safeguard, and improve LLM applications, with
            best-in-class metrics and tracing.
          </p>
          <div
            className={`${styles.btnWrap} ${hasAnimated ? styles.fadeUp2 : ""}`}
          >
            <Button
              to="https://www.confident-ai.com/book-a-demo"
              variant="outlined"
              color="purple"
              label="Request a Demo"
              bordered
              sizes="md"
              curved
              style={{ borderWidth: "1px" }}
            />
            <Button
              to="https://app.confident-ai.com/auth/signup?redirect_url=%2F"
              variant="contained"
              color="primary"
              label="Try Now For Free"
              bordered
              sizes="md"
              curved
            />
          </div>
        </div>

        <div className={styles.imageWrap}>
          <div className={styles.topNav}>
            <div className={`${styles.tabIcons} ${styles.red}`}></div>
            <div className={`${styles.tabIcons} ${styles.yellow}`}></div>
            <div className={`${styles.tabIcons} ${styles.green}`}></div>
          </div>
          <img
            src="/img/banner/bannerImage.png"
            alt="Illustration showing productivity and teamwork"
          />
        </div>
      </div>

      {[0, 1, 2].map((_, i) => (
        <span key={i} className={styles.meteors} />
      ))}

      <div className={styles.absoluteBackground}></div>
      <Marquee />
    </div>
  );
}
