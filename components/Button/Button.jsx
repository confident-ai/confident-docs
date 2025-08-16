"use client";
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
  onClick,
  ...other
}) {
  const className = `
    ${styles.btn} 
    ${styles[variant]} 
    ${styles[sizes]}
    ${bordered ? styles.bordered : ''}
    ${curved ? styles.curved : ""} 
    ${styles[color]}
  `;
  if (to) {
    return (
      <Link
        href={to}
        className={className}
        {...other}
      >
        {label}
      </Link>
    );
  } else {
    return (
      <button
        type="button"
        className={className}
        {...other}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
}
