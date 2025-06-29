"use client";
import React from "react";
import { usePageParams } from "../PageParamsContext";
import CopyMarkdownButton from "../CopyMarkdownButton";

export default function H1WithCopy({ children, ...props }) {
  const params = usePageParams();
  let pagePath = "";
  if (params?.mdxPath && Array.isArray(params.mdxPath)) {
    pagePath = params.mdxPath.join("/");
  }
  return (
    <div style={{ position: "relative", marginBottom: "1.5rem" }}>
      <CopyMarkdownButton pagePath={pagePath} />
      <h1 {...props}>{children}</h1>
    </div>
  );
} 