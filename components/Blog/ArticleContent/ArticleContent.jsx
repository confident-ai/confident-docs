import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Feature from "@/components/Blog/Feature/Feature";

import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-bash";

import styles from "./styles.module.scss";
import { useInView } from "react-intersection-observer";
export default function ArticleContent({ content }) {
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        // naive code block detection: backticks
        const text =
          node.content && node.content[0] && node.content[0].value
            ? node.content[0].value
            : "";
        const isCode = children[0] && children[0].type === "code";

        if (isCode) {
          const language = text.match(/^```(\w+)/)?.[1] || "plaintext";
          const code = text
            .replace(/^```(\w+)?/, "")
            .replace(/```$/, "")
            .trim();

          const highlighted = Prism.highlight(
            code,
            Prism.languages[language] || Prism.languages.plaintext,
            language
          );

          return (
            <div className={styles.codeWrap}>
              <pre style={{ backgroundColor: "#111b27" }}>
                <code
                  className={`language-${language}`}
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              </pre>
            </div>
          );
        }

        // Check if all children are falsy or empty strings
        const hasContent =
          children &&
          children.some(child => {
            if (typeof child === "string") {
              return child.trim().length > 0;
            }
            return !!child;
          });

        if (!hasContent) {
          return null;
        }

        return <p>{children}</p>;
      },
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { file, title, description } = node.data.target.fields;
        return (
          <div>
            <img
              src={file.url}
              alt={description || title || "Blog image"}
              style={{ maxWidth: "100%" }}
            />
          </div>
        );
      },
      [BLOCKS.HEADING_1]: (node, children) => {
        const text = node.content.map(c => c.value).join("");
        const id = text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "") // remove non-word characters
          .replace(/\s+/g, "-") // replace spaces with hyphens
          .replace(/-+/g, "-"); // collapse multiple hyphens

        return <h1 id={id}>{children}</h1>;
      },

      [BLOCKS.HEADING_2]: (node, children) => {
        const text = node.content.map(c => c.value).join("");
        const id = text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "") // remove non-word characters
          .replace(/\s+/g, "-") // replace spaces with hyphens
          .replace(/-+/g, "-"); // collapse multiple hyphens

        return <h2 id={id}>{children}</h2>;
      },

      [BLOCKS.HEADING_4]: (node, children) => {
        const text = node.content.map(c => c.value).join("");
        const id = text
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "") // remove non-word characters
          .replace(/\s+/g, "-") // replace spaces with hyphens
          .replace(/-+/g, "-"); // collapse multiple hyphens

        return <h4 id={id}>{children}</h4>;
      },
    },
  };
  console.log(content);
  return (
    <div className={styles.ArticleContent}>
      {documentToReactComponents(content, options)}
      <Feature />
    </div>
  );
}
