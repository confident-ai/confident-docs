import styles from "./styles.module.scss";
export default function TextSection() {
  return (
    <div className={styles.TextSection}>
      <h2 className={styles.heading}>Our Hiring Process</h2>
      <p className={styles.paragraph}>
        The entire process is <b>usually fully remote</b> and all communication
        happens over email or via video chat in Google Meet. We know that you
        may be interviewing elsewhere as well so am respectful of your time and
        will get back no later than 2 days of each step along the process.
      </p>
      <p className={styles.ulHeading}>
        The entire process has 4 steps and takes around 1.5 week in total:
      </p>
      <ul className={styles.list}>
        <li>Initial 15-30 minute phone screening interview.</li>
        <li>One 30-45 minute technical interview.</li>
        <li>One week <b>fully-paid </b> work trial.</li>
        <li>Full-time offer.</li>
      </ul>
      <p className={styles.paragraph}>
        You'll be working with the founders directly throughout the entire
        process. For any questions, email hiring@confident-ai.com.
      </p>
    </div>
  );
}
