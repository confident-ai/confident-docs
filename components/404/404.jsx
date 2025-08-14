import styles from "./styles.module.scss";
import Button from "@/components/Button/Button";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.inner}>
        <h1>404</h1>
        <h2>Page Not found</h2>
        <Button
          to="/"
          variant="outlined"
          label="Back to Home"
          color="primary"
          bordered
          sizes="lg"
          curved
          style={{ boxShadow: "0 0 4px #fff", marginTop: "20px" }}
        />
      </div>
    </div>
  );
}
