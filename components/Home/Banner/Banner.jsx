"use client";

import Image from "next/image";
import styles from "./styles.module.scss";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Banner({ data }) {
  const [hasAnimated, setHasAnimated] = useState(false);

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true, // ensures it only runs once
  });

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);

  return (
    <div className={styles.Banner}>
      <div className={styles.inner}>
        <div className={styles.backedBy}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="28px"
            height="28px"
            viewBox="0 0 256 256"
            version="1.1"
            preserveAspectRatio="xMidYMid"
          >
            <g>
              <rect fill="#FB651E" x="0" y="0" width="256" height="256"></rect>
              <path
                d="M119.373653,144.745813 L75.43296,62.4315733 L95.5144533,62.4315733 L121.36192,114.52416 C121.759575,115.452022 122.2235,116.413008 122.753707,117.407147 C123.283914,118.401285 123.747838,119.428546 124.145493,120.48896 C124.410597,120.886615 124.609422,121.251127 124.741973,121.582507 C124.874525,121.913886 125.007075,122.212123 125.139627,122.477227 C125.802386,123.802744 126.39886,125.095105 126.929067,126.354347 C127.459274,127.613589 127.923198,128.773399 128.320853,129.833813 C129.381268,127.580433 130.541078,125.1614 131.80032,122.57664 C133.059562,119.99188 134.351922,117.307747 135.67744,114.52416 L161.92256,62.4315733 L180.612267,62.4315733 L136.27392,145.739947 L136.27392,198.826667 L119.373653,198.826667 L119.373653,144.745813 Z"
                fill="#FFFFFF"
              ></path>
            </g>
          </svg>
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
            {data?.heading}
          </h1>
          <p
            className={`${styles.bannerDescription} ${
              hasAnimated ? styles.fadeUp : ""
            }`}
          >
            {data?.description}
          </p>
          <div
            className={`${styles.btnWrap} ${hasAnimated ? styles.fadeUp2 : ""}`}
          >
            {data?.buttons?.map((btn, i) => (
              <div key={i}>
                <a
                  href={btn?.link}
                  className={`${styles.btn} ${styles[btn?.variant]}`}
                >
                  {btn?.txt}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.imageWrap}>
          <img src={data?.image?.url} alt={data?.image?.alt} />
        </div>
      </div>

      {[0, 1, 2].map((_, i) => (
        <span key={i} className={styles.meteors} />
      ))}

      <div className={styles.absoluteBackground}></div>
    </div>
  );
}
