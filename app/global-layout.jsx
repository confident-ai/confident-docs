import CustomNavbar from '@/components/CustomNavbar/CustomNavbar';
import Footer from "@/components/Footer/Footer";
import styles from "./styles.module.scss";
import "@/app/styles/prism-vsc-dark-plus.css";
// import "@/app/styles/prism-colddark-dark.css";
import links from './links'

export default function GlobalLayout({ children, variant = 'dark', isDocsPage = false, staticHeader }) {
  return (
    <div className={`${styles.all} ${staticHeader ? styles.staticHeader : ""}`}>
      <CustomNavbar isDocsPage={isDocsPage} staticHeader={staticHeader} />
      {children}
      <Footer variant={variant} links={links} />
    </div>
  );
}
