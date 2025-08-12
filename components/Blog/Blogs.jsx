"use client";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import cardStyles from './card.module.scss'
import Skeleton from "@/components/Skeleton/Skeleton";
import Card from "./Card/Card";

export default function Blogs({
  limit = 3,
  blogOrientation = "horizontal",
  showTabs = false,
  blogVariant = "light",
  exclude = null,
  disableLoader = true,
  category = null,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const totalPages = Math.ceil(totalCount / limit);
  const [blogs, setBlogs] = useState([]);

  const tabOptions = [
    { title: "All Stories", value: "all" },
    { title: "Evaluation", value: "evaluation" },
    { title: "Safety", value: "safety" },
  ];

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      const res = await fetch(
        `/api/blogs?page=${currentPage}&limit=${limit}&category=${
          category === null ? tab : category
        }&excludeSlug=${exclude}`
      );
      const data = await res.json();
      setBlogs(data?.items);
      setTotalCount(data?.total);
      setIsLoading(false);
    };
    fetchBlogs();
  }, [currentPage, tab]);

  const onChangeTab = value => {
    setCurrentPage(1);
    setTab(value);
  };

  return (
    <div className={`${styles.blogSection} ${styles[blogOrientation]}`}>
      <div className={`${styles.inner} ${styles[blogOrientation]}`}>
        {showTabs && (
          <div className={styles.tabs}>
            {tabOptions.map(item => (
              <div
                className={`${styles.tab} ${
                  item.value === tab ? styles.active : ""
                }`}
                key={item.value}
                onClick={() => onChangeTab(item.value)}
              >
                <span>{item.title}</span>
              </div>
            ))}
            <span className={styles.slider} />
          </div>
        )}
        <div className={styles.blogs}>
          {!isLoading &&
            blogs?.map((blog, idx) => (
              <Card
                blog={blog}
                key={idx}
                variant={blogVariant}
                styles={cardStyles}
                orientation={blogOrientation}
              />
            ))}

          {isLoading &&
            [...Array(limit)].map((_, index) => (
              <Skeleton
                key={index}
                className={`${cardStyles.Card} ${cardStyles[blogOrientation]}`}
              />
            ))}
        </div>
        <div className={styles.pagination}>
          {currentPage !== 1 && (
            <button
              className={`${styles.btn} ${isLoading ? styles.disabled : ""}`}
              disabled={isLoading}
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
              Back
            </button>
          )}
          {currentPage !== totalPages && (
            <button
              className={`${styles.btn} ${isLoading ? styles.disabled : ""}`}
              disabled={isLoading}
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
