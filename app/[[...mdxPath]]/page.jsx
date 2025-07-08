import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents as getMDXComponents } from "../../mdx-components"
import { redirect } from 'next/navigation' 
import { PageParamsProvider } from '../../components/PageParamsContext'

export const generateStaticParams = generateStaticParamsFor('mdxPath')
 
export async function generateMetadata(props) {
  const params = await props.params
  // If no mdxPath, this is the root route - use custom metadata
  if (!params.mdxPath || params.mdxPath.length === 0) {
    return {
      title: 'The LLM Evaluation Platform',
      description: 'By the authors of DeepEval, Confident AI is the open-source platform for evaluating and improving LLM applications.'
    }
  }
  const { metadata } = await importPage(params.mdxPath)
  return metadata
}
 
const Wrapper = getMDXComponents().wrapper
 
export default async function Page(props) {
  const params = await props.params
  
  // If no mdxPath, this is the root route - render custom home page
  if (!params.mdxPath || params.mdxPath.length === 0) {
    redirect('/docs')
  }

  
  const result = await importPage(params.mdxPath)
  const { default: MDXContent, toc, metadata } = result
  return (
    <Wrapper toc={toc} metadata={metadata}>
      <PageParamsProvider value={params}>
        <MDXContent {...props} params={params} />
      </PageParamsProvider>
    </Wrapper>
  )
}

