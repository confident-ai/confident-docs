"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import { getGithubStars } from "@/functions/get-stars";
import { useEffect, useState } from "react";

export default function SocialsSection() {
  const [githubStars, setGithubStars] = useState("10k+");
  
  useEffect(() => {
    getGithubStars().then(setGithubStars);
  }, []);

  const cards = [
    {
      icon: '/icons/discord.svg',
      cardHeading: "Discord",
      socialLink: "https://discord.com/invite/a3K9c8GRGt",
      cardDescription: "2,500+ members",
    },
    {
      icon: '/icons/github.svg',
      cardHeading: "GitHub",
      socialLink: "https://github.com/confident-ai/deepeval",
      cardDescription: `${githubStars} stars`,
    },
    {
      icon: '/icons/documentations.svg',
      cardHeading: "Docs",
      cardDescription: "100,000+ monthly reads",
      socialLink: "https://documentation.confident-ai.com/docs",
    },
  ];

  return (
    <div className={styles.CardSection}>
      <div className={styles.inner}>
        <div className={styles.textWrap}>
          <span className={styles.subHeading} style={{ color: "#7a14ff" }}>
            OPEN-SOURCE COMMUNITY
          </span>
          <h2 className={styles.heading}>
            100,000+ devs already do evals the
            Confident way.
          </h2>
          <div
            className={`${styles.cards} ${
              cards?.length % 2 !== 0 ? styles.centeredCards : ""
            }`}
          >
            {cards.map((card, idx) => (
              <Link
                href={card.socialLink}
                key={idx}
                
                className={styles.card}
                style={{ width: `calc(100% / ${cards.length} )` }}
              >
                <div className={styles.cardIcon}>
                  <Image src={card.icon} width={50} height={50} alt={card.cardHeading}/>
                </div>
                <h3 className={styles.cardHeading}>
                  {card.cardHeading}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 512 512"
                  >
                    <g>
                      <path
                        d="M512 21.805v331.202c0 12.042-9.763 21.805-21.805 21.805s-21.805-9.763-21.805-21.805V74.451L37.225 505.615c-4.259 4.257-9.838 6.386-15.419 6.386s-11.16-2.129-15.419-6.386c-8.516-8.516-8.516-22.323 0-30.839L437.553 43.61h-278.56c-12.042 0-21.805-9.763-21.805-21.805S146.951 0 158.993 0h331.202C502.237-.001 512 9.763 512 21.805z"
                        fill="#fefefe"
                      />
                    </g>
                  </svg>
                </h3>
                <p className={styles.cardDescription}>{card.cardDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
