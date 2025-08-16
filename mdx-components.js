import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs' // nextra-theme-blog or your custom theme
import ComparisonTable from './components/mdxComponents/ComparisonTable'
import VideoDisplayer from './components/mdxComponents/VideoDisplayer'
import ImageDisplayer from './components/mdxComponents/ImageDisplayer'
import SignUpButton from './components/SignUpButton'
import NavIconTabItem from './components/mdxComponents/NavIconTabItem'
 
// Get the default MDX components
const themeComponents = getThemeComponents()
 
// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ComparisonTable,
    VideoDisplayer,
    ImageDisplayer,
    SignUpButton,
    NavIconTabItem,
    ...components
  }
}