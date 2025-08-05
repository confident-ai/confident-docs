import styles from "./styles.module.scss";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";

export default function CaseStudyContent({ content, fields }) {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => {
        return <h1>{children}</h1>;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2>{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return <h3>{children}</h3>;
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return <h4>{children}</h4>;
      },
      [BLOCKS.QUOTE]: (node, children) => (
        <div className={styles.blockquote}>
          <blockquote>
            {children}
            <p><sup><b>{fields?.representative}</b></sup></p>
            <p><sup>{fields?.representativesRole}</sup></p>
          </blockquote>
        </div>
      ),
    },
  };
  return (
    <div className={styles.caseContent}>
      {documentToReactComponents(content, options)}
    </div>
  );
}
