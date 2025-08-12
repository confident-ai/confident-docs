"use client";
import { useEffect, useState } from "react";

import Counter from "@/components/Home/Marquee/Counter";
import styles from "./styles.module.scss";

export default function Marquee() {
  const images = [
    { url: "icons/brand-icons/accenture.svg", alt: "Accenture logo" },
    { url: "icons/brand-icons/airbus.svg", alt: "airbus logo" },
    { url: "icons/brand-icons/astrazeneca.svg", alt: "astrazeneca logo" },
    { url: "icons/brand-icons/aws.svg", alt: "aws logo" },
    { url: "icons/brand-icons/booking.svg", alt: "booking.com logo" },
    { url: "icons/brand-icons/cisco.svg", alt: "cisco logo" },
    { url: "icons/brand-icons/deloitte.svg", alt: "deloitte logo" },
    { url: "icons/brand-icons/pwc.svg", alt: "pwc logo" },
    { url: "icons/brand-icons/sales-force.svg", alt: "sales force logo" },
    { url: "icons/brand-icons/toyota.svg", alt: "toyota logo" },
  ];
  const [githubStars, setGithubStars] = useState(0); // fallback default
  useEffect(() => {
    fetch("https://api.github.com/repos/confident-ai/deepeval")
      .then(res => res.json())
      .then(data => {
        if (data?.stargazers_count) {
          setGithubStars(data.stargazers_count);
        }
      })
      .catch(err => {
        console.error("Failed to fetch GitHub stars:", err);
      });
  }, []);
  return (
    <div className={styles.marqueeContainer}>
      <div className={styles.inner}>
        <span className={styles.trustedBy}>
          OPEN-SOURCE & TRUSTED BY TOP COMPANIES AROUND THE WORLD
        </span>
        <div className={styles.marquee}>
          <div className={styles.MarqueeBar1}>
            {images.map((img, idx) => (
              <img key={idx} src={`${img.url}`} alt={img.alt} />
            ))}
          </div>
          <div className={styles.MarqueeBar2}>
            {images.map((img, idx) => (
              <img key={idx} src={`${img.url}`} alt={img.alt} />
            ))}
          </div>
        </div>
        <div className={styles.socialProofsContainer}>
          <div className={styles.socialProof}>
            <Counter target={600000} />
            <span className={styles.proofsTitle}>Daily evaluations</span>
          </div>
          <div className={styles.socialProof}>
            {githubStars > 0 && <Counter target={githubStars} />}
            <span className={styles.proofsTitle}>Github stars</span>
          </div>
          <div className={styles.socialProof}>
            <Counter target={500000} />
            <span className={styles.proofsTitle}>Monthy Downloads</span>
          </div>
        </div>
      </div>
    </div>
  );
}
