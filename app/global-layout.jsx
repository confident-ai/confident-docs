"use client"
import CustomNavbar from '@/components/CustomNavbar/CustomNavbar';
import Footer from "@/components/Footer/Footer";
import styles from "./styles.module.scss";
import "@/app/styles/prism-vsc-dark-plus.css";
// import "@/app/styles/prism-colddark-dark.css";
import links from './links'
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
        <Footer variant={variant} links={links} />
      </div>
      <div className={`${styles.loaderOverlay} ${loaded ? styles.loaded : ''}`}></div>
    </>
  );
}
