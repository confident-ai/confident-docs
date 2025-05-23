import { CircleHelp, Rocket, MessageSquareText, PenLine, Settings, FlaskConical, Telescope, User, Lightbulb, House, ShieldAlert, BookOpen, Folders, Zap, GitBranch } from 'lucide-react'
import NavIconTabItem from '@/components/NavIconTabItem'

export default {
  "why-confident-ai": <NavIconTabItem icon={CircleHelp} label="Why Confident AI" />,
  "llm-use-cases": <NavIconTabItem icon={Lightbulb} label="LLM Use Cases" />,
  "data-handling": <NavIconTabItem icon={Folders} label="Data Handling" />,
  "on-prem-hosting": <NavIconTabItem icon={House} label="On-Prem Hosting" />,
  "llm-red-teaming": {
    title: <NavIconTabItem icon={ShieldAlert} label="LLM Red Teaming" />,
    "display": "hidden"
  },
  concepts: {
    title: <NavIconTabItem icon={BookOpen} label="Concepts" />,
    theme: {
      collapsed: true
    }
  },
  "---": {
    type: "separator",
    title: <NavIconTabItem icon={Zap} label="Quickstart" />
  },
  index: "",
  "how-it-works": "",
  "getting-started": {
    title: "Getting Started",
    theme: {
      collapsed: true
    }
  },
  "---2": {
    type: "separator",
    title: <NavIconTabItem icon={FlaskConical} label="LLM Evaluation" />
  },
  "llm-evaluation": <NavIconTabItem icon={FlaskConical} label="LLM Evaluation" />,
  "---3": {
    type: "separator",
    title: <NavIconTabItem icon={GitBranch} label="LLM Tracing" />
  },
  "llm-tracing":  <NavIconTabItem icon={GitBranch} label="LLM Tracing" />,
  "---4": {
    type: "separator",
    title: <NavIconTabItem icon={PenLine} label="Dataset Editor" />
  },
  "dataset-editor": <NavIconTabItem icon={PenLine} label="Dataset Editor" />,
  "---5": {
    type: "separator",
    title: <NavIconTabItem icon={MessageSquareText} label="Prompt Management" />
  },
  "prompt-management": <NavIconTabItem icon={MessageSquareText} label="Prompt Management" />,
  "---6": {
    type: "separator",
    title: <NavIconTabItem icon={User} label="Human-in-the-Loop" />
  },
  "human-in-the-loop": <NavIconTabItem icon={User} label="Human-in-the-Loop" />,
  "---7": {
    type: "separator",
    title: <NavIconTabItem icon={Settings} label="Project Settings" />
  },
  "project-settings":  <NavIconTabItem icon={Settings} label="Project Settings" />,
  "navigation": {
    type: "menu",
    title: "More resources",
    items: {
      "home": {
        title: "Home Page",
        href: "https://confident-ai.com"
      },
      "pricing": {
        title: "Pricing",
        href: "https://confident-ai.com/pricing"
      },
      "book-a-demo": {
        title: "Book a Demo",
        href: "https://confident-ai.com/book-a-demo"
      },
      "docs": {
        title: "DeepEval",
        href: "https://deepeval.com"
      },
    }
  }
} 