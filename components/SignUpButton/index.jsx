import React from 'react';
import styles from './SignUpButton.module.scss';

const SignUpButton = ({ text = 'Sign Up Now', darkMode = false }) => {
  return (
    <a 
      href="https://app.confident-ai.com/auth/signup" 
      target="_blank" 
      rel="noopener"
      className={`${styles.signUpButton} ${darkMode ? styles.darkMode : ""}`}
    >
      {text}
    </a>
  );
};

export default SignUpButton; 