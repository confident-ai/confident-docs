import styles from './GitHubButton.module.scss';
import { Github, Star } from 'lucide-react';

const GitHubButton = () => {
  return (
    <div className={styles.githubButton}>
      <div className={styles.githubIconContainer}>
        <Github size={20} fill="black" />
      </div>
      <span>8.0k+</span>
      <Star size={16} fill="#ffdd00" />
    </div>
  );
};

export default GitHubButton;