"use client";
import styles from "./notFoundstyles.module.scss";
import Button from "@/components/Button/Button";
import CustomNavbar from "@/components/CustomNavbar/CustomNavbar";
import Footer from "@/components/Footer/Footer";
import links from "./links";
export default function notFound() {
  return (
    <>
      <CustomNavbar isDocsPage={false} staticHeader={true} />
      <div className={styles.notFound}>
        <div className={styles.inner}>
          <h1>404</h1>
          <h2>Page Not found</h2>
          <Button
            onClick={() => window.history.back()}
            variant="outlined"
            label="Go Back"
            color="purple"
            bordered
          />
        </div>
      </div>
      <Footer variant="dark" links={links} />
    </>
  );
}
