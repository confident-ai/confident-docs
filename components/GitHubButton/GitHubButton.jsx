"use client";
import { useEffect, useState } from "react";
import styles from "./GitHubButton.module.scss";
import { Github, Star } from "lucide-react";
import { formatStars } from "@/functions/format-stars";


const GitHubButton = ({ darkMode = false }) => {
  const [githubStars, setGithubStars] = useState("10k+"); // fallback default

  useEffect(() => {
    fetch("https://api.github.com/repos/confident-ai/deepevals")
      .then(res => res.json())
      .then(data => {
        if (data?.stargazers_count) {
          setGithubStars(data.stargazers_count);
        }
      })
      .catch(err => {
        console.error("Failed to fetch GitHub stars:", err);
      });
  }, []);
  
  return (
    <div
      className={`${styles.githubButton} ${darkMode ? styles.darkMode : ""}`}
    >
      <div
        className={`${styles.githubIconContainer} ${
          darkMode ? styles.darkMode : ""
        }`}
      >
        <Github size={20} fill={darkMode ? "black" : "black"} color="black" />
      </div>
      <span>{formatStars(githubStars)}</span>
      <Star size={16} fill="#ffdd00" color={darkMode ? "#ffdd00" : "black"} />
    </div>
  );
};

export default GitHubButton;
