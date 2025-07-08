"use client"
import React from "react"

export default function CopyMarkdownButton({ pagePath }) {
  const [copied, setCopied] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const copyToClipboard = async (text) => {
    // Check if clipboard API is available
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch (err) {
        console.warn('Clipboard API failed:', err)
        // Fall through to fallback method
      }
    }
    
    // Fallback: use document.execCommand
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    } catch (err) {
      console.error('Fallback copy failed:', err)
      return false
    }
  }

  const handleCopy = async () => {
    if (!pagePath) return
    setLoading(true)
    setError(null)
    try {
      console.log("Looking for file at " + pagePath)
      const res = await fetch(`/api/raw-mdx?path=${encodeURIComponent(pagePath)}`)
      if (!res.ok) throw new Error('Failed to fetch markdown')
      const markdown = await res.text()
      
      const success = await copyToClipboard(markdown)
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      } else {
        setError('Failed to copy to clipboard')
      }
    } catch (err) {
      console.log("See the error" + err)
      setError('Error copying markdown')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        position: 'absolute',
        right: 0,
        top: '-1.5rem',
        fontSize: '0.85rem',
        padding: '0.3rem 0.7rem',
        background: '#f3f3f3',
        border: '1px solid #ccc',
        borderRadius: '6px',
        cursor: loading ? 'wait' : 'pointer',
        zIndex: 2
      }}
      aria-label="Copy markdown"
      disabled={loading}
    >
      {loading ? 'Loading...' : copied ? 'Copied!' : 'Copy markdown'}
      {error && <span style={{ color: 'red', marginLeft: 8 }}>{error}</span>}
    </button>
  )
}