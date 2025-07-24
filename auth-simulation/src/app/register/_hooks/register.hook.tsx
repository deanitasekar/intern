import useAuth from "@/hooks/use-auth.hook";
import { RegisterRequest } from "@/types/auth.type";
import getErrorMessage from "@/utils/error.util";
import { useState } from "react";

interface UseRegisterReturn {
  formData: RegisterRequest;
  error: string;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setFormData: React.Dispatch<React.SetStateAction<RegisterRequest>>;
  clearError: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register } = useAuth();

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
      await register(formData);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => {
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
  };
}