'use client'

import { Banner } from 'nextra/components'
import { usePathname } from 'next/navigation'

const CustomBanner = () => {
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  return (
    <Banner storageKey="confident-docs-banner">Confident AI is <a target="_blank" href="https://app.confident-ai.com/auth/signup" style={{textDecoration: 'underline'}}>free to try <svg xmlns="http://www.w3.org/2000/svg" width="0.9em" height="0.9em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline', verticalAlign: 'text-top'}}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg></a>. No credit card required.</Banner>
  )
}

export default CustomBanner 