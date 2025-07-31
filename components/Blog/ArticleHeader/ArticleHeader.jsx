import styles from "./styles.module.scss";
import { formatDate } from "@/functions/format-date";

export default function ArticleHeader({ content }) {
  return (
    <>
      <div className={styles.articleAuthor}>
        <div className={styles.profilePicture}>
          <img
            src={content?.author?.fields?.profilePicture?.fields?.file?.url}
            alt="Author Pfp"
          />
        </div>
        <div className={styles.infoWrap}>
          <span className={styles.username}>
            {content?.author?.fields?.name}
          </span>
          <p className={styles.about}>{content?.author?.fields?.about}</p>
        </div>
      </div>
      <div className={styles.wrap}>
        <div className={styles.articleTitle}>
          <h1>{content?.title}</h1>
        </div>
        <div className={styles.articleMeta}>
          <span className={styles.publishDate}>
            {formatDate(content.createdDate)}
          </span>
          <span className={styles.seperator}>.</span>
          <span className={styles.readTime}>{content.readTime}</span>
        </div>
        <div className={styles.imageWrap}>

        </div>
      </div>
    </>
  );
}
