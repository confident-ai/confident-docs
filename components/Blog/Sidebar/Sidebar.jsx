"use client";
import Link from "next/link";
import styles from "./styles.module.scss";
import { Fragment, useState } from "react";
import Image from "next/image";

export default function SideBar({ content, mobile = false }) {
  const [mobileDropDownActive, setMobileDropDownActive] = useState(false);
  const slugify = (text, options = {}) => {
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

    for (const node of allNodes) {
      const text = (node.content || [])
        .map(item => item?.value || "")
        .join("")
        .trim();

      if (!text) continue;

      if (node.nodeType === "heading-2") {
        sections.push({ title: text, children: [] });
      } else if (node.nodeType === "heading-4" && sections.length > 0) {
        sections[sections.length - 1].children.push(text);
      }
    }

    return sections;
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
          <Image src="/icons/arrow-down-black.svg" width={12} height={12} alt="down-wards facing arrow" />
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
                  href={`#${slugify(section.title, {
                    lower: true,
                    strict: true,
                  })}`}
                >
                  {section.title}
                </Link>
              </li>
              {section.children.length > 0 &&
                section.children.map((sub, j) => (
                  <li className={styles.childLink} key={`sub-${i}-${j}`}>
                    <Link
                      href={`#${slugify(sub, { lower: true, strict: true })}`}
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
