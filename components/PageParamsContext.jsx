"use client";
import React, { createContext, useContext } from "react";

const PageParamsContext = createContext({});
export const usePageParams = () => useContext(PageParamsContext);

export function PageParamsProvider({ value, children }) {
  return (
    <PageParamsContext.Provider value={value}>
      {children}
    </PageParamsContext.Provider>
  );
} 