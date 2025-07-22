import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from '@contentful/rich-text-types';
import Prism from 'prismjs';
import "prismjs/components/prism-python";
import "prismjs/components/prism-markdown";
import styles from './styles.module.scss';
export default function ArticleContent({content}) {
    const options = {
        renderNode: {
          [BLOCKS.PARAGRAPH]: (node, children) => {
            // naive code block detection: backticks
            const text = node.content[0].value;
            const isCode = children[0].type === 'code';
      
            if (isCode) {
              const language = text.match(/^```(\w+)/)?.[1] || 'plaintext';
              const code = text.replace(/^```(\w+)?/, '').replace(/```$/, '');
      
              const highlighted = Prism.highlight(code, Prism.languages[language] || Prism.languages.plaintext, language);
      
              return (
                <pre style={{ backgroundColor: "#111b27"}}>
                  <code
                    className={`language-${language}`}
                    dangerouslySetInnerHTML={{ __html: highlighted }}
                  />
                </pre>
              );
            }
      
            return <p>{children}</p>;
          },
        },
      };

    return(
        <div className={styles.ArticleContent}>
            {documentToReactComponents(content, options)}
        </div>
    )
}