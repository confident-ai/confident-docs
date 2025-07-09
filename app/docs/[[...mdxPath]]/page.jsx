// import { generateStaticParamsFor, importPage } from "nextra/pages";
// import { useMDXComponents as getMDXComponents } from "../../../mdx-components";
// import { redirect } from "next/navigation";

// export const generateStaticParams = generateStaticParamsFor("mdxPath");

// export async function generateMetadata(props) {
//   const params = await props.params;
//   // If no mdxPath, this is the root route - use custom metadata
//   if (!params.mdxPath || params.mdxPath.length === 0) {
//     return {
//       title: "The LLM Evaluation Platform",
//       description:
//         "By the authors of DeepEval, Confident AI is the open-source platform for evaluating and improving LLM applications.",
//     };
//   }
//   const { metadata } = await importPage(params.mdxPath);
//   return metadata;
// }

// export default async function Page(props) {
//   const params = await props.params;

//   // If no mdxPath, this is the root route - render custom home page
//   if (!params.mdxPath || params.mdxPath.length === 0) {
//     const result = await importPage(["docs", "page"]);
//     const { default: MDXContent, toc, metadata } = result;
//     const Wrapper = getMDXComponents().wrapper;
//     return (
//       <Wrapper toc={toc} metadata={metadata}>
//         <MDXContent />
//       </Wrapper>
//     );
//   }

//   const result = await importPage(params.mdxPath);
//   const { default: MDXContent, toc, metadata } = result;
//   return (
//     <Wrapper toc={toc} metadata={metadata}>
//       <MDXContent {...props} params={params} />
//     </Wrapper>
//   );
// }

import { importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from '../../../mdx-components'

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
