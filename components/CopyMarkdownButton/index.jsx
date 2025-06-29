"use client"
import React from "react"

export default function CopyMarkdownButton({ pagePath }) {
  const [copied, setCopied] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleCopy = async () => {
    if (!pagePath) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/raw-mdx?path=${encodeURIComponent(pagePath)}`)
      if (!res.ok) throw new Error('Failed to fetch markdown')
      const markdown = await res.text()
      await navigator.clipboard.writeText(markdown)
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    } catch (err) {
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
        top: '-2.5rem',
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