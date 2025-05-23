import nextra from 'nextra'
import path from 'path'
import { fileURLToPath } from 'url'

// Get the directory name in ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const withNextra = nextra({
  defaultShowCopyCode: true,
  staticImage: true
})

// For Nextra 4.x, theme configuration is handled separately

// You can include other Next.js configuration options here, in addition to Nextra settings:
export default withNextra({
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    }
    return config
  },
})