import styles from "./styles.module.scss";
export default function SideBar() {
  return (
    <div className={styles.sideBarWrap}>
      <div className={styles.sidebar}>
        <span>In this story</span>
        <ul>
          <li>What is synthetic data?</li>
          <li>The struggles i generate textual data</li>
          <li>
            Generating synthetic data with LLMs
            <ul>
              <li>
                Using dynamic Prompts templates to make synthetic Data realisitc
              </li>
            </ul>
          </li>
          <li>Conclusion </li>
        </ul>
      </div>
    </div>
  );
}
