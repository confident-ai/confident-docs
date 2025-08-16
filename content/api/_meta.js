import { UserCog, Gauge, MessageSquareText, PenLine, Settings, FlaskConical, User, Lightbulb, House, ShieldAlert, BookOpen, Folders, GitBranch } from 'lucide-react'
import NavIconTabItem from '@/components/mdxComponents/NavIconTabItem'

export default {
    index: "",
    quickstart: "",
    "---1": {
        type: "separator",
        title: <NavIconTabItem icon={Gauge} label="Metrics" />
    },
    "metrics":  <NavIconTabItem icon={Gauge} label="Metrics" />,
    "---2": {
        type: "separator",
        title: <NavIconTabItem icon={FlaskConical} label="Evaluation" />
    },
    "evaluation":  <NavIconTabItem icon={FlaskConical} label="Evaluation" />,
    "---3": {
        type: "separator",
        title: <NavIconTabItem icon={GitBranch} label="Tracing" />
    },
    "tracing":  <NavIconTabItem icon={GitBranch} label="Tracing" />,
    "---4": {   
        type: "separator",
        title: <NavIconTabItem icon={BookOpen} label="Datasets" />
    },
    "datasets":  <NavIconTabItem icon={BookOpen} label="Datasets" />,
    // "---5": {
    //     type: "separator",
    //     title: <NavIconTabItem icon={MessageSquareText} label="Prompts" />
    // },
    // "---6": {
    //     type: "separator",
    //     title: <NavIconTabItem icon={UserCog} label="User & Project Management" />
    // },
}