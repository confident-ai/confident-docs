import NewHeader from "@/components/Home/NewHeader";
import Footer from "@/components/Footer/Footer";
import styles from "./styles.module.scss";
import "@/app/styles/prism-vsc-dark-plus.css";
import links from './links'

export default function GlobalLayout({ children }) {
  return (
    <div className={styles.all}>
      <NewHeader />
      {children}
      <Footer variant='dark' links={links} />
    </div>
  );
}
