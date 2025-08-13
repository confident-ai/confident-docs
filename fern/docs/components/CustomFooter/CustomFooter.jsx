'use client'

import { Footer } from 'nextra-theme-docs'
import Image from 'next/image'
import styles from './CustomFooter.module.scss'
import { usePathname } from 'next/navigation'

const CustomFooter = () => {
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  return (
    <Footer>
      <div className={styles.customFooter}>
        <div className={styles.footerRow}>
          <div className={`${styles.footerColumn} ${styles.companyInfo}`}>
            <img className={styles.logo} src="/icons/logo.svg" alt="Confident AI Logo" />
            <div className={styles.companyName}>
              Confident AI - The DeepEval Platform
            </div>
            <div className={styles.copyright}>
              Copyright © {new Date().getFullYear()} Confident AI, Inc. All rights reserved.
            </div>
            <div className={styles.madeWithLove}>
              Made with ❤️ and confidence
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <iframe 
                className={styles.statusBadge}
                src="https://status.confident-ai.com/badge?theme=dark" 
                width="182" 
                height="31"
                style={{backgroundColor: 'black', borderRadius: '10px', overflow: 'hidden'}}
                title="Confident AI Status"
              />
            </div>
          </div>
        </div>
        <div className={styles.footerRow}>
          <div className={styles.footerColumn}>
            <div className={styles.complianceBadges}>
              <Image 
                src="/img/HIPAA.png" 
                alt="HIPAA Compliant" 
                width={80} 
                height={40}
                className={styles.complianceBadge}
              />
              <Image 
                src="/img/SOC2.png" 
                alt="SOC II Compliant" 
                width={80} 
                height={40}
                className={styles.complianceBadge}
              />
            </div>
          </div>
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <a href="https://confident-ai.com" target="_blank" rel="noopener" className={styles.link}>
                  Home Page
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://confident-ai.com/book-a-demo" target="_blank" rel="noopener" className={styles.link}>
                  Book a Demo
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://confident-ai.com/pricing" target="_blank" rel="noopener" className={styles.link}>
                  Pricing
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://confident-ai.com/terms" target="_blank" rel="noopener" className={styles.link}>
                  Terms of Service  
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://confident-ai.com/privacy-policy" target="_blank" rel="noopener" className={styles.link}>
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Resources</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <a href="https://deepeval.com" target="_blank" rel="noopener" className={styles.link}>
                  DeepEval Docs
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://trydeepteam.com" target="_blank" rel="noopener" className={styles.link}>
                  DeepTeam Docs
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://www.confident-ai.com/blog/llm-evaluation-metrics-everything-you-need-for-llm-evaluation" target="_blank" rel="noopener" className={styles.link}>
                  LLM Evaluation Metrics
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://www.confident-ai.com/blog/why-llm-as-a-judge-is-the-best-llm-evaluation-method" target="_blank" rel="noopener" className={styles.link}>
                  LLM as a Judge
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://www.confident-ai.com/blog/llm-testing-in-2024-top-methods-and-strategies" target="_blank" rel="noopener" className={styles.link}>
                  Top LLM Testing Techniques in 2025
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://www.confident-ai.com/blog/llm-agent-evaluation-complete-guide" target="_blank" rel="noopener" className={styles.link}>
                  LLM Agent Evaluation
                </a>
              </li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>LLM Evals Community</h3>
            <ul className={styles.linksList}>
              <li className={styles.linkItem}>
                <a href="https://discord.gg/3SEyvpgu2f" target="_blank" rel="noopener" className={styles.link}>
                  Join Discord
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://github.com/confident-ai/deepeval" target="_blank" rel="noopener" className={styles.link}>
                  GitHub
                </a>
              </li>
              <li className={styles.linkItem}>
                <a href="https://confident-ai.com/blog" target="_blank" rel="noopener" className={styles.link}>
                  LLM Evaluation Blog
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default CustomFooter 