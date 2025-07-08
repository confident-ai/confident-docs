import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme
import ComparisonTable from './components/ComparisonTable'
import VideoDisplayer from './components/VideoDisplayer'
import ImageDisplayer from './components/ImageDisplayer'
import SignUpButton from './components/SignUpButton'
import NavIconTabItem from './components/NavIconTabItem'
import H1WithCopy from './components/H1WithCopy'
 
// Get the default MDX components
const themeComponents = getThemeComponents()
 
// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    h1: H1WithCopy,
    ComparisonTable,
    VideoDisplayer,
    ImageDisplayer,
    SignUpButton,
    NavIconTabItem,
    ...components
  }
}