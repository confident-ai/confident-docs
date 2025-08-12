import styles from "./styles.module.scss";
 import Button from '@/components/Button/Button'

export default function TextOnlySection() {
  return (
    <div className={styles.TextOnlySection}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          The Future of AI Depends On <span>Confident AI</span> You.
        </h2>
        <div className={styles.buttonWrap}>
          <Button
            to="/book-a-demo"
            variant="contained"
            color="primary"
            label="Request a Demo"
            bordered
          />
          <Button
            to="https://app.confident-ai.com/auth/signup?redirect_url=%2F"
            variant="outlined"
            color="purple"
            label="Try Now For Free"
            bordered
            style={{ borderSize: "2px" }}
          />
        </div>
      </div>
    </div>
  );
}
