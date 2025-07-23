import styles from './GitHubButton.module.scss';
import { Github, Star } from 'lucide-react';

const githubButtonText = "8.0k+";

const GitHubButton = ({darkMode = false}) => {
  return (
    <div className={`${styles.githubButton} ${darkMode ? styles.darkMode : ""}`}>
      <div className={`${styles.githubIconContainer} ${darkMode ? styles.darkMode : ""}`}>
        <Github size={20} fill={darkMode ? "black" : "black"} color="black" />
      </div>
      <span>{githubButtonText}</span>
      <Star size={16} fill="#ffdd00" color={darkMode ? "#ffdd00" : "black"}/>
    </div>
  );
};

export default GitHubButton;