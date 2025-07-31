"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function SideBar({
  content,
  mobile = false,
  theme = "deepEval",
}) {
  const [mobileDropDownActive, setMobileDropDownActive] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef(null);

  const generateSlug = (text, options = {}) => {
    const { lower = true, strict = false } = options;
    let slug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    if (strict) {
      slug = slug.replace(/[^a-z0-9-]/g, "");
    }

    return lower ? slug : slug.charAt(0).toUpperCase() + slug.slice(1);
  };

  const getSidebarNavigation = content => {
    const allNodes = Object.entries(content || {})
      .filter(([key]) => key.startsWith("contentBody") && content[key])
      .flatMap(([_, body]) => body?.content || []);

    const sections = [];
    const headingStack = [];

    for (const node of allNodes) {
      const text = (node.content || [])
        .map(item => item?.value || "")
        .join("")
        .trim();

      if (!text) continue;

      // Check if it's any heading level (h2-h7)
      if (node.nodeType && node.nodeType.startsWith("heading-")) {
        const headingLevel = parseInt(node.nodeType.split("-")[1]);

        // Create heading object
        const heading = {
          title: text,
          level: headingLevel,
          children: [],
          id: generateSlug(text, { lower: true, strict: true }),
        };

        // Find the appropriate parent based on heading level
        // Pop headings from stack that are at the same level or higher
        while (
          headingStack.length > 0 &&
          headingStack[headingStack.length - 1].level >= headingLevel
        ) {
          headingStack.pop();
        }

        if (headingStack.length === 0) {
          // This is a top-level heading
          sections.push(heading);
          headingStack.push(heading);
        } else {
          // This is a sub-heading
          const parent = headingStack[headingStack.length - 1];
          parent.children.push(heading);
          headingStack.push(heading);
        }
      }
    }

    return sections;
  };

  // Set up intersection observer for scroll-based active state
  useEffect(() => {
    const sections = getSidebarNavigation(content);
    const allHeadings = [];

    // Flatten all headings (including nested ones) for observation
    const flattenHeadings = sections => {
      sections.forEach(section => {
        allHeadings.push(section);
        if (section.children && section.children.length > 0) {
          flattenHeadings(section.children);
        }
      });
    };

    flattenHeadings(sections);

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0px 0px -70% 0px", // Adjust these values to fine-tune when a section becomes active
        threshold: 0,
      }
    );

    // Observe all heading elements
    allHeadings.forEach(heading => {
      const element = document.getElementById(heading.id);
      if (element) {
        observerRef.current.observe(element);
      }
    });

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [content]);

  // Helper function to check if a section or any of its children is active
  const isSectionActive = section => {
    if (activeSection === section.id) {
      return true;
    }

    // Check if any child is active
    if (section.children && section.children.length > 0) {
      return section.children.some(child => isSectionActive(child));
    }

    return false;
  };

  // Recursive function to render nested children
  const renderNestedChildren = (children, parentIndex) => {
    return children.map((child, childIndex) => (
      <li
        className={`${styles.childLink}`}
        key={`child-${parentIndex}-${childIndex}`}
      >
        <Link
          href={`#${child.id}`}
          className={activeSection === child.id ? styles.active : ""}
        >
          {child.title}
        </Link>
        {/* Recursively render nested children */}
        {child.children && child.children.length > 0 && (
          <ul className={styles.nestedList}>
            {renderNestedChildren(
              child.children,
              `${parentIndex}-${childIndex}`
            )}
          </ul>
        )}
      </li>
    ));
  };

  const sections = getSidebarNavigation(content);
  const activateMobileDropdown = () => {
    setMobileDropDownActive(!mobileDropDownActive);
  };

  return (
    <div className={`${styles.sideBarWrap} ${mobile ? styles.mobile : ""}`}>
      <div className={styles.sidebar} id="sidebar">
        <span
          className={`${styles.sidebarHeading} ${
            mobileDropDownActive ? styles.active : ""
          }`}
          onClick={activateMobileDropdown}
        >
          In this story{" "}
          <Image
            src="/icons/arrow-down-black.svg"
            width={12}
            height={12}
            alt="down-wards facing arrow"
          />
        </span>
        <ul
          className={`${styles.list} ${
            mobileDropDownActive ? styles.active : ""
          }`}
        >
          {sections.map((section, i) => (
            <Fragment key={`fragment-${i}`}>
              <li key={`section-${i}`}>
                <Link
                  href={`#${section.id}`}
                  className={isSectionActive(section) ? styles.active : ""}
                >
                  {section.title}
                </Link>
              </li>
              {/* Automatically render all nested children */}
              {section.children && section.children.length > 0 && (
                <ul className={styles.nestedList}>
                  {renderNestedChildren(section.children, i)}
                </ul>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
