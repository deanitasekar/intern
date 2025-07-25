import { useState } from "react";
import { useAuth } from "@/hooks/use-auth.hook";
import { AuthRequest } from "@/types/auth.type";
import getErrorMessage from "@/utils/error.util";

interface UseLoginReturn {
  formData: AuthRequest;
  error: string;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<AuthRequest>>;
  clearError: () => void;
  fillDummyCredentials: () => void;
}

export const useLogin = (): UseLoginReturn => {
  const [formData, setFormData] = useState<AuthRequest>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await login(formData);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  const fillDummyCredentials = () => {
    setFormData({
      username: "user",
      password: "pass",
    });
    setError("");
  };

  return {
    formData,
    error,
    isSubmitting,
    handleChange,
    handleSubmit,
    setFormData,
    clearError,
    fillDummyCredentials,
  };
};

export default useLogin;
