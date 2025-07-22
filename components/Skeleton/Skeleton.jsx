import styles from "./styles.module.scss";

export default function Skeleton({ className, ...other }) {
  
    return (
        <div className={`${className} ${styles.skeleton}`} {...other}> </div>
    )
}