'use client'

import {  Navbar } from 'nextra-theme-docs'
import Logo from '@/components/Logo/Logo'
import GitHubButton from '@/components/GitHubButton/GitHubButton'
import SignUpButton from '@/components/SignUpButton'
import { usePathname } from 'next/navigation'

const CustomNavbar = () => {
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  return (
    <Navbar
        logo={<Logo />}
        projectLink="https://github.com/confident-ai/deepeval"
        projectIcon={<GitHubButton />}
        // chatLink="https://discord.gg/Up3gbNTF"
    >
        <SignUpButton />
    </Navbar>
  )
}

export default CustomNavbar