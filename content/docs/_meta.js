import { CircleHelp, MessageSquareText, PenLine, Settings, FlaskConical, User, Lightbulb, House, ShieldAlert, BookOpen, Folders, GitBranch } from 'lucide-react'
import NavIconTabItem from '@/components/NavIconTabItem'

export default {
  page: "",
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
  "---": {
    type: "separator",
    title: "Appendix Resources"
  },
  concepts: {
    title: <NavIconTabItem icon={BookOpen} label="Concepts" fontWeight="500" />,
    theme: {
      collapsed: true
    }
  },
  "why-confident-ai": <NavIconTabItem icon={CircleHelp} label="Why Confident AI" fontWeight="500" />,
  "llm-use-cases": <NavIconTabItem icon={Lightbulb} label="LLM Use Cases" fontWeight="500" />,
  "data-handling": <NavIconTabItem icon={Folders} label="Data Handling" fontWeight="500" />,
  "on-prem-hosting": <NavIconTabItem icon={House} label="On-Prem Hosting" fontWeight="500" />,
  "llm-red-teaming": {
    title: <NavIconTabItem icon={ShieldAlert} label="LLM Red Teaming" fontWeight="500" />,
    "display": "hidden"
  },
} 