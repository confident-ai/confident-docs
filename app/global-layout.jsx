"use client"
import CustomNavbar from '@/components/customNavbar/customNavbar';
import Footer from "@/components/footer/footer";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

export default function GlobalLayout({ children, variant = 'dark', isDocsPage = false, staticHeader }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Wait for window load event (all resources loaded)
    const handleLoad = () => setLoaded(true);

    if (document.readyState === "complete") {
      setLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      <div
        className={`${styles.all} ${staticHeader ? styles.staticHeader : ""} ${
          loaded ? styles.loaded : ""
        }`}
      >
        <CustomNavbar isDocsPage={isDocsPage} staticHeader={staticHeader} />
        {children}
        <Footer variant={variant}  />
      </div>
      <div className={`${styles.loaderOverlay} ${loaded ? styles.loaded : ''}`}></div>
    </>
  );
}
