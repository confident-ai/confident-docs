"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import Button from "@/components/Button/Button";
import { useInView } from "react-intersection-observer";
export default function TextOnlySection() {
  const [hasAnimated, setHasAnimated] = useState(false);

  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: true, // ensures it only runs once
  });

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);
  
  return (
    <div className={styles.TextOnlySection} ref={ref}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          When your AI needs improvement, you need Confident AI.
        </h2>
        <div
          className={`${styles.buttonWrap} ${hasAnimated ? styles.fadeUp : ""}`}
        >
          <Button
            to="/book-a-demo"
            variant="contained"
            color="primary"
            label="Request a Demo"
            bordered
            sizes="xxs"
            />
          <Button
            to="https://app.confident-ai.com/auth/signup?redirect_url=%2F"
            variant="outlined"
            color="purple"
            label="Try Now For Free"
            bordered
            sizes="xxs"
            style={{ borderWidth: "1px" }}
          />
        </div>
      </div>
    </div>
  );
}
