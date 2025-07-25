import useAuth from "@/hooks/use-auth.hook";
import { RegisterRequest } from "@/types/auth.type";
import getErrorMessage from "@/utils/error.util";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type RegisterFormInputs = {
  username: string;
  email: string;
  password: string;
};

interface UseRegisterReturn {
  register: any;
  handleSubmit: any;
  formState: { errors: any; isSubmitting: boolean };
  error: string;
  onSubmit: SubmitHandler<RegisterFormInputs>;
  clearError: () => void;
}

export const useRegister = (): UseRegisterReturn => {
  const [error, setError] = useState("");
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setError("");

    try {
      await registerUser(data);
    } catch (error) {
      setError(getErrorMessage(error));
    }
  };

  const clearError = () => {
    setError("");
  };

  return {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    error,
    onSubmit,
    clearError,
  };
};
