import { promises as fs } from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const relPath = searchParams.get('path')
  if (!relPath) {
    return NextResponse.json({ error: 'Missing path parameter' }, { status: 400 })
  }
  // Only allow .mdx files and prevent path traversal
  const safePath = path.normalize(relPath).replace(/^\/+/g, '').replace(/\/+$/g, '')
  if (safePath.includes('..')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 })
  }
  // Try both direct file and index file
  const filePaths = [
    path.join(CONTENT_ROOT, `${safePath}.mdx`),
    path.join(CONTENT_ROOT, safePath, 'index.mdx')
  ]
  for (const filePath of filePaths) {
    try {
      const content = await fs.readFile(filePath, 'utf8')
      return new NextResponse(content, {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      })
    } catch (err) {
      // Try next path
    }
  }
  return NextResponse.json({ error: 'File not found' }, { status: 404 })
} 