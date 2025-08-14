"use client";
import { useEffect, useState } from "react";
import styles from "./GitHubButton.module.scss";
import { Github, Star } from "lucide-react";
import { formatStars } from "@/functions/format-stars";
import Link from "next/link";


const GitHubButton = ({ darkMode = false, asIcon = false }) => {
  const [githubStars, setGithubStars] = useState("10k+"); // fallback default

  useEffect(() => {
    fetch("https://api.github.com/repos/confident-ai/deepeval")
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
  
  const content = (
    <>
      <div
        className={`${styles.githubIconContainer} ${
          darkMode ? styles.darkMode : ""
        }`}
      >
        <Github size={20} fill={"black"} color="black" />
      </div>
      <span>{formatStars(githubStars)}</span>
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
