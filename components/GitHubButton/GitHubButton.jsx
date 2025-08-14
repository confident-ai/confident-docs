"use client";
import { useEffect, useState } from "react";
import styles from "./GitHubButton.module.scss";
import { Github, Star } from "lucide-react";
import { getGithubStars } from "@/functions/get-stars";
import Link from "next/link";


const GitHubButton = ({ darkMode = false, asIcon = false }) => {
  const [githubStars, setGithubStars] = useState("10k+"); // fallback default

  useEffect(() => {
    getGithubStars().then(setGithubStars);
  }, []);
  
  const content = (
    <>
      <div
        className={`${styles.githubIconContainer} ${
          darkMode ? styles.darkMode : ""
        }`}
      >
        <Github size={20} fill={"black"} color="black" />
      </div>
      <span>{githubStars}</span>
      <Star size={16} fill="#ffdd00" color={darkMode ? "#ffdd00" : "black"} />
    </>
  );

  // If asIcon is true, render as div to avoid nested anchor tags
  if (asIcon) {
    return (
      <div className={`${styles.githubButton} ${darkMode ? styles.darkMode : ""}`}>
        {content}
      </div>
    );
  }
  
  return (
    <Link
      href="https://github.com/confident-ai/deepeval"
      target="_blank"
      className={`${styles.githubButton} ${darkMode ? styles.darkMode : ""}`}
    >
      {content}
    </Link>
  );
};

export default GitHubButton;
