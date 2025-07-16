import { importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '@/mdx-components'


export async function generateMetadata(props) {
  const params = await props.params;
  // If no mdxPath, this is the root route - use custom metadata
  if (!params.mdxPath || params.mdxPath.length === 0) {
    return {
      title: "The LLM Evaluation Platform",
      description:
        "By the authors of DeepEval, Confident AI is the open-source platform for evaluating and improving LLM applications.",
    };
  }
  
  const { metadata } = await importPage(['docs', ...params.mdxPath]);
  return metadata;
 
}

export default async function Page({ params }) {
  const mdxPath = await params;
  const mdxPathArray = mdxPath?.mdxPath || [];


  if (mdxPathArray.length === 0) {

    // For the root `/docs` route, import the `page.mdx` explicitly:
    const result = await importPage(['docs']);
    const { default: MDXContent, toc, metadata } = result
    const Wrapper = getMDXComponents().wrapper
    return (
      <Wrapper toc={toc} metadata={metadata}>
        <MDXContent />
      </Wrapper>
    )
  }

  // For nested docs paths
  const result = await importPage(['docs', ...mdxPathArray]);
  const { default: MDXContent, toc, metadata } = result
  const Wrapper = getMDXComponents().wrapper
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent />
    </Wrapper>
  )
}
