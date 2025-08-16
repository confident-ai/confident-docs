import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { formatDate } from "@/functions/format-date";
import { BLOCKS } from "@contentful/rich-text-types";
import styles from "./styles.module.scss";
export default function Terms({ content, term }) {
  const generateSlug = (text, options = {}) => {
    const { lower = true, strict = false } = options;
    let slug = text
      .toLowerCase()
      .trim()
      .replace(/[\d]/g, "") // remove numbers
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (strict) {
      slug = slug.replace(/[^a-z-]/g, ""); // only allow a-z and hyphens
    }

    return lower ? slug : slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => {
        const text = children
          .map(child => (typeof child === "string" ? child : ""))
          .join("");
        const slug = generateSlug(text);
        return (
          <h1 id={slug}>
            {children} <a href={`#${slug}`}>#</a>
          </h1>
        );
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        const text = children
          .map(child => (typeof child === "string" ? child : ""))
          .join("");
        const slug = generateSlug(text);
        return (
          <h2 id={slug}>
            {children} <a href={`#${slug}`}>#</a>
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        const text = children
          .map(child => (typeof child === "string" ? child : ""))
          .join("");
        const slug = generateSlug(text);
        return (
          <h3 id={slug}>
            {children} <a href={`#${slug}`}>#</a>
          </h3>
        );
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        const text = children
          .map(child => (typeof child === "string" ? child : ""))
          .join("");
        const slug = generateSlug(text);
        return (
          <h4 id={slug}>
            {children} <a href={`#${slug}`}>#</a>
          </h4>
        );
      },
      [BLOCKS.TABLE]: (node, children) => (
        <div className={styles.table}>{children}</div>
      ),
      [BLOCKS.TABLE_ROW]: (node, children) => {
        // Count columns by filtering header/cell children
        const colCount = children.filter(
          child =>
            child?.type === "div" &&
            (child.props.className === styles.tableHeaderCell ||
              child.props.className === styles.tableCell)
        ).length;

        // Add a class like "cols-3" or "cols-2"
        return (
          <div className={`${styles.tableRow} ${styles[`cols-${colCount}`]}`}>
            {children}
          </div>
        );
      },
      [BLOCKS.TABLE_HEADER_CELL]: (node, children) => (
        <div className={styles.tableHeaderCell}>{children}</div>
      ),
      [BLOCKS.TABLE_CELL]: (node, children) => (
        <div className={styles.tableCell}>{children}</div>
      ),
    },
  };
  return (
    <div className={styles.termsContent}>
      <h1 id={generateSlug(term?.fields?.heading)}>
        {term?.fields?.heading}{" "}
        <a href={`#${generateSlug(term?.fields?.heading)}`}>#</a>
      </h1>
      <span className={styles.dateModified}>
        Last Modified: {formatDate(term?.sys.updatedAt)}
      </span>
      {documentToReactComponents(content, options)}
    </div>
  );
}
