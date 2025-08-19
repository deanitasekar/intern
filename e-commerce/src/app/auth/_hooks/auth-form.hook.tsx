"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    newsletter: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const { login, logout, isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const response = await login({
          username: credentials.username,
          password: credentials.password,
        });
        router.push("/products");
      } else {
        if (credentials.password !== credentials.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
        alert("Registration functionality coming soon!");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          `${isLogin ? "Login" : "Registration"} failed. Please try again.`
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const fillDemoCredentials = () => {
    setCredentials((prev) => ({
      ...prev,
      username: "mor_2314",
      password: "83r5^_",
    }));
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setCredentials({
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      confirmPassword: "",
      newsletter: false,
    });
  };

  return {
    isLogin,
    setIsLogin,
    credentials,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    isLoading,
    isAuthenticated,
    user,
    router,
    logout,
    handleSubmit,
    handleInputChange,
    fillDemoCredentials,
    toggleAuthMode,
  };
};
