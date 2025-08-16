import Image from "next/image";
import { formatMonthYear } from "@/functions/format-date";
import styles from "./styles.module.scss";
export default function CaseStudyHeader({ content }) {
  return (
    <>
      <div className={styles.CaseStudyHeader}>
        <div className={styles.inner}>
          <div className={styles.textWrap}>
            <span className={styles.subTitle}>CASE STUDY</span>
            <h1 className={styles.heading}>{content?.heading}</h1>
            <div className={styles.list}>
              <div className={styles.listItem}>
                <span className={styles.subHeading}>Company</span>
                <span className={styles.value}>{content?.company}</span>
              </div>
              <div className={styles.listItem}>
                <span className={styles.subHeading}>Headcount</span>
                <span className={styles.value}>{content?.headcount}</span>
              </div>
              <div className={styles.listItem}>
                <span className={styles.subHeading}>Location</span>
                <span className={styles.value}>{content?.location}</span>
              </div>
              <div className={styles.listItem}>
                <span className={styles.subHeading}>Customer Since</span>
                <span className={styles.value}>
                  {formatMonthYear(content?.customerSince)}
                </span>
              </div>
              <div className={styles.listItem}>
                <span className={styles.subHeading}>Industry</span>
                <span className={styles.value}>{content?.industry}</span>
              </div>
            </div>
          </div>
          <div className={styles.imageWrap}>
            <img
              src={`${content.companyLogo.fields.file.url}`}
              alt={content.companyLogo.fields.title || content.company}
              width={135}
              height={135}
              className={styles.companyLogo}
            />
          </div>
        </div>
      </div>
      <div className={styles.quote}>
        <div className={styles.inner}>
          <p>{content?.quote}</p>
          <div className={styles.wrap}>
            <sup className={styles.representativeName}>
              {content?.representative}
            </sup>
            <sup className={styles.representativeRole}>
              {content?.representativesRole}
            </sup>
          </div>
        </div>
      </div>
    </>
  );
}
