import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Feature from "@/components/Blog/Feature/Feature";

import Prism from "prismjs";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";

import styles from "./styles.module.scss";

export default function ArticleContent({ content, theme }) {
  const generateSlug = text => {
    const slug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    return slug;
  };
  const options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        // Get the full text content
        const text =
          node.content && node.content[0] && node.content[0].value
            ? node.content[0].value
            : "";

        // Match code block at the start of the paragraph
        const codeMatch = text.match(/^```(\w+)?\n?([\s\S]*?)```/);

        if (codeMatch) {
          const language = codeMatch[1] || "plaintext";
          const code = codeMatch[2].trim();

          const highlighted = Prism.highlight(
            code,
            Prism.languages[language] || Prism.languages.plaintext,
            language
          );

          // Get any text after the code block
          const afterCode = text.slice(codeMatch[0].length).trim();

          return (
            <>
              <div className={styles.codeWrap}>
                <pre style={{ backgroundColor: "#111b27" }}>
                  <code
                    className={`language-${language}`}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                </pre>
              </div>
              {afterCode && <p>{afterCode}</p>}
            </>
          );
        }

        // Fallback: render as normal paragraph
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

        let descContent;
        if (description) {
          descContent = [];
          let lastIndex = 0;
          const regex = /\[([^\]]+)\][({]([^)}]+)[)}]/g;
          let match;
          let key = 0;
          while ((match = regex.exec(description)) !== null) {
            if (match.index > lastIndex) {
              descContent.push(description.slice(lastIndex, match.index));
            }
            descContent.push(
              <a
                key={key++}
                href={match[2]}
                target="_blank"
                rel="noopener noreferrer"
              >
                {match[1]}
              </a>
            );
            lastIndex = regex.lastIndex;
          }
          // Add any remaining text after the last match
          if (lastIndex < description.length) {
            descContent.push(description.slice(lastIndex));
          }
        }

        return (
          <div>
            <img
              src={file.url}
              alt={description || title || "Blog image"}
              style={{ maxWidth: "100%" }}
            />
            {description && <sub>{descContent}</sub>}
          </div>
        );
      },
      [BLOCKS.HEADING_1]: (node, children) => {
        const text = node.content.map(c => c.value).join("");
        const id = generateSlug(text);
        return <h1 id={id}>{children}</h1>;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        const text = node.content.map(c => c.value).join("");
        const id = generateSlug(text);
        return <h2 id={id}>{children}</h2>;
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        const text = node.content.map(c => c.value).join("");
        const id = generateSlug(text);
        return <h3 id={id}>{children}</h3>;
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        const text = node.content.map(c => c.value).join("");
        const id = generateSlug(text);
        return <h4 id={id}>{children}</h4>;
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        const text = node.content.map(c => c.value).join("");
        const id = generateSlug(text);
        return <h5 id={id}>{children}</h5>;
      },
      [BLOCKS.HEADING_6]: (node, children) => {
        const text = node.content.map(c => c.value).join("");
        const id = generateSlug(text);
        return <h6 id={id}>{children}</h6>;
      },
    },
  };
  return (
    <div className={`${styles.ArticleContent} ${styles[theme]}`}>
      {documentToReactComponents(content, options)}
      <Feature theme={theme} />
    </div>
  );
}
