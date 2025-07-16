"use client";

import { useState } from "react";
import styles from "./styles.module.scss";
export default function Blogs() {
  const [currentfilter, setCurrentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;
  const filterOptions = [
    { title: "All Stories", value: "all" },
    { title: "Evaluation", value: "evaluation" },
    { title: "Safety", value: "safety" },
  ];
  const tabSwitcher = value => {
    setCurrentFilter(value);
  };

  const paginatedBlogs = (
    currentfilter === "all"
      ? blogs
      : blogs
          .filter(b => b.tag === currentfilter)
          .sort((a, b) => a.heading.localeCompare(b.heading))
  ).slice((currentPage - 1) * blogsPerPage, currentPage * blogsPerPage);

  const totalPages = Math.ceil(
    (currentfilter === "all"
      ? blogs
      : blogs.filter(b => b.tag === currentfilter)
    ).length / blogsPerPage
  );
  return (
    <div className={styles.blogSection}>
      <div className={styles.inner}>
        <div className={styles.tabs}>
          {filterOptions.map(filter => (
            <div
              className={`${styles.tab} ${
                filter.value === currentfilter ? styles.active : ""
              }`}
              key={filter.value}
              onClick={() => tabSwitcher(filter.value)}
            >
              <span>{filter.title}</span>
            </div>
          ))}
          <span className={styles.slider} />
        </div>
        <div className={styles.blogs}>
          {paginatedBlogs.map((blog, idx) => (
            <div key={idx} className={styles.blogItem}>
              <div className={styles.imageWrap}>
                <img
                  src={blog?.image}
                  alt="add image here later and alt text"
                />
              </div>
              <div className={styles.textWrap}>
                <div>
                  <h2 className={styles.heading}>{blog?.heading}</h2>
                  <p className={styles.description}>{blog?.description}</p>
                </div>
                <div className={styles.author}>
                  <div className={styles.profilePicture}>
                    <img
                      src={blog?.profilePicture}
                      alt="Authors profile picture"
                    />
                  </div>
                  <div className={styles.user}>
                    <h3 className={styles.username}>{blog.author}</h3>
                    <div className={styles.infoWrap}>
                      <span className={styles.createdAt}>{blog.createdAt}</span>
                      <div className={styles.lineBreaker}>
                        <strong>.</strong>
                      </div>
                      <span className={styles.readingTime}>
                        {blog.averageReadingTime} read
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.pagination}>
          {currentPage !== 1 && (
            <button
              className={styles.btn}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              <svg
                className="w-pagination-previous-icon"
                height="12px"
                width="12px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  fillRule="evenodd"
                  d="M8 10L4 6l4-4"
                />
              </svg>
              Previous
            </button>
          )}
          {currentPage !== totalPages && (
            <button
              className={styles.btn}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
              <svg
                className="w-pagination-next-icon"
                height="12px"
                width="12px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 12 12"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  fillRule="evenodd"
                  d="M4 2l4 4-4 4"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const blogs = [
  {
    heading: <>LLM Guardrails for Data Leakage, Prompt Injection, and More</>,
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffrey Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: <>LLM Guardrails for Data Leakage, Prompt Injection, and More</>,
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffrey Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: <>LLM Guardrails for Data Leakage, Prompt Injection, and More</>,
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffrey Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: <>LLM Guardrails for Data Leakage, Prompt Injection, and More</>,
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffrey Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: <>LLM Guardrails for Data Leakage, Prompt Injection, and More</>,
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffrey Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: <>LLM Guardrails for Data Leakage, Prompt Injection, and More</>,
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffrey Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: <>LLM Guardrails for Data Leakage, Prompt Injection, and More</>,
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffrey Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: <>LLM Guardrails for Data Leakage, Prompt Injection, and More</>,
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffrey Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: <>LLM Guardrails for Data Leakage, Prompt Injection, and More</>,
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffrey Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
  {
    heading: "LLM Guardrails for Data Leakage, Prompt Injection, and More",
    description:
      "In this article, you'll learn everything you need to know on LLM guardrails and how to use it for LLM security.",
    author: "Jeffery Ip",
    createdAt: "Jan 26, 2025",
    averageReadingTime: "15 min",
    tag: "safety",
  },
];
