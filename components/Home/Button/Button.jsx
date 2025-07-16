import Link from 'next/link'
import styles from "./styles.module.scss";
export default function Button({
  to,
  variant,
  sizes = 'lg', // sizes must be sm,md,lg,xl Or any that are in styles.module.scss
  label,
  curved,
  color = 'primary',
  bordered,
  ...other
}) {
  return (
    <Link
      href={to}
      className={`
            ${styles.btn} 
            ${styles[variant]} 
            ${styles[sizes]}
            ${bordered ? styles.bordered : ''}
            ${curved ? styles.curved : ""} 
            ${styles[color]}
            `}
      {...other}
    >
      {label}
    </Link>
  );
}
