"use client";

import { useContext } from "react";
import { ArticleContext, type ArticleContextType } from "@/contexts/article.context";

export const useArticle = (): ArticleContextType => {
  const context = useContext(ArticleContext);
  return context;
};

export default useArticle;