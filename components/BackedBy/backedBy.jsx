import styles from "./styles.module.scss";
import Image from "next/image";

export default function BackedBy() {
  return <div className={styles.backedBy}>
    <Image
      alt="Y Combinator company logo"
      src="/icons/brand-icons/ycombinator.svg"
      width={28}
      height={28}
    />
    <div className={styles.BackedByText}>
      <span>Backed by</span>Y Combinator
    </div>
  </div>;
}
