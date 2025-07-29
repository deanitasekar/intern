import { ArticleContext } from "@/contexts/article.context";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface UseDetailArticleProps {
  articleId: string;
}

interface UseDetailArticleReturn {
  article: any;
  isLoading: boolean;
  isInitialized: boolean;
  handleEdit: () => void;
  handleDelete: () => void;
  handleBack: () => void;
}

export const useDetailArticle = ({
  articleId,
}: UseDetailArticleProps): UseDetailArticleReturn => {
  const { getArticle, deleteArticle } = useContext(ArticleContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const router = useRouter();
  const article = getArticle(articleId);

  useEffect(() => {
    if (article) {
      setIsInitialized(true);
    } else {
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [article]);

  const handleEdit = () => {
    setIsLoading(true);
    router.replace(`/edit/${articleId}`);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setIsLoading(true);

      try {
        deleteArticle(articleId);
        setTimeout(() => {
          router.replace("/");
        }, 2000);
      } catch (error) {
        console.error("Error deleting article:", error);
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    setIsLoading(true);
    router.back();
  };

  return {
    article,
    isLoading,
    isInitialized,
    handleEdit,
    handleDelete,
    handleBack,
  };
};
