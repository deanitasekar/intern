import { useState } from "react";
import { useRouter } from "next/navigation";
import { useArticle } from "../../../hooks/use-article.hook";
import { CreateArticleInput } from "@/types/article.type";

interface UseCreateReturn {
  title: string;
  description: string;
  content: string;
  isLoading: boolean;
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

const DEFAULT_CONTENT = "# Article Title\n\nWrite your article content here...";

export const useCreate = (): UseCreateReturn => {
  const router = useRouter();
  const { addArticle } = useArticle();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const isFormValid =
    title.trim() !== "" &&
    content.trim() !== "" &&
    content.trim() !== DEFAULT_CONTENT;

  const hasUnsavedChanges =
    title.trim() !== "" ||
    description.trim() !== "" ||
    (content.trim() !== "" && content.trim() !== DEFAULT_CONTENT);

  const validateForm = (): string => {
    if (!title.trim()) {
      return "Title can't be empty";
    }

    if (!content.trim() || content.trim() === DEFAULT_CONTENT) {
      return "Content can't be empty";
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

      const articleData: CreateArticleInput = {
        title: title.trim(),
        description: description.trim() || "No description provided",
        content: content.trim(),
      };

      addArticle(articleData);

      router.push("/");
    } catch (error) {
      console.error("Error creating article:", error);
      setError("Failed to save the article. Please try again.");
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
    router.push("/");
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
    title,
    description,
    content,
    isLoading,
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