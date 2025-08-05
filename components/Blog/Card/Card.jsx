"use client";

import Link from "next/link";
import { formatDate } from "@/functions/format-date";
export default function Card({ blog, variant = "Dark", orientation, styles }) {
  return (
    <Link
      href={`/blog/${blog?.fields?.link}`}
      className={`${styles.Card} ${styles[variant]} ${styles[orientation]}`}
    >
      <div className={styles.imageWrap}>
        <img
          src={blog?.fields?.thumbnail?.fields?.file?.url}
          alt={blog?.fields?.thumbnail?.fields?.title}
        />
      </div>
      <div className={styles.textWrap}>
        <div>
          <h2 className={styles.heading}>{blog?.fields?.title}</h2>
          <p className={styles.description}>{blog?.fields?.excerpt}</p>
        </div>
        <div className={styles.author}>
          <div className={styles.profilePicture}>
            <img
              src={
                blog?.fields?.author?.fields?.profilePicture?.fields?.file?.url
              }
              alt={blog?.fields?.author?.fields?.profilePicture?.fields?.title}
            />
          </div>
          <div className={styles.user}>
            <h3 className={styles.username}>
              {blog?.fields?.author?.fields?.name}
            </h3>
            <div className={styles.infoWrap}>
              <span className={styles.createdAt}>
                {formatDate(blog?.fields?.createdDate)}
              </span>
              <div className={styles.lineBreaker}>
                <strong>.</strong>
              </div>
              <span className={styles.readingTime}>
                {blog?.fields?.readTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
