import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { ArticleContext } from "@/contexts/article.context";

interface UseEditArticleProps {
  articleId: string;
}

interface UseEditArticleReturn {
  article: any;
  title: string;
  description: string;
  content: string;
  isLoading: boolean;
  showSuccess: boolean;
  isInitialized: boolean;
  error: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setContent: (content: string) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
  handleBack: () => void;
  handleCloseError: () => void;
  isFormValid: boolean;
  hasUnsavedChanges: boolean;
}

export const useEditArticle = ({
  articleId,
}: UseEditArticleProps): UseEditArticleReturn => {
  const router = useRouter();
  const { getArticle, updateArticle } = useContext(ArticleContext);
  const article = getArticle(articleId);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (article) {
      setTitle(article.title);
      setDescription(article.description);
      setContent(article.content);
      setIsInitialized(true);
    } else {
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [article]);

  const isFormValid = title.trim() !== "" && content.trim() !== "";

  const hasUnsavedChanges = article
    ? title !== article.title ||
      description !== article.description ||
      content !== article.content
    : false;

  const validateForm = (): string => {
    if (!title.trim()) {
      return "Title cannot be empty";
    }
    if (!content.trim()) {
      return "Content cannot be empty";
    }
    return "";
  };

  const handleSave = async (): Promise<void> => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      updateArticle({
        id: articleId,
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
      });

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        router.push(`/article/${articleId}`);
      }, 2000);
    } catch (error) {
      console.error("Error updating article:", error);
      setError("Failed to update article. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (): void => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to leave this page?"
      );
      if (!confirmed) return;
    }
    router.push(`/article/${articleId}`);
  };

  const handleBack = (): void => {
    if (hasUnsavedChanges) {
      const confirmed = window.confirm(
        "You have unsaved changes. Are you sure you want to go back?"
      );
      if (!confirmed) return;
    }
    router.back();
  };

  const handleCloseError = (): void => {
    setError("");
  };

  return {
    article,
    title,
    description,
    content,
    isLoading,
    showSuccess,
    isInitialized,
    error,
    setTitle,
    setDescription,
    setContent,
    handleSave,
    handleCancel,
    handleBack,
    handleCloseError,
    isFormValid,
    hasUnsavedChanges,
  };
};
