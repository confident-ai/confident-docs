"use client";
import React from "react";
import { usePageParams } from "../PageParamsContext";
import CopyMarkdownButton from "../CopyMarkdownButton";

export default function H1WithCopy({ children, ...props }) {
  const params = usePageParams();
  console.log("H1WithCopy - params:", params);
  
  let pagePath = "";
  if (params?.mdxPath && Array.isArray(params.mdxPath)) {
    pagePath = params.mdxPath.join("/");
  }
  console.log("H1WithCopy - pagePath:", pagePath);
  
  return (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', position: 'relative' }}>
    <h1 {...props}>{children}</h1>
    <CopyMarkdownButton pagePath={pagePath} />
  </div>  );
} 