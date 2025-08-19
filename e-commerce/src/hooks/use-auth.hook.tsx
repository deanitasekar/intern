"use client";
import { useContext } from "react";
import { AuthContext, type AuthContextType } from "@/contexts/auth.context";
import useSWR from "swr";
import { authService } from "@/services/auth.service";
import { User } from "@/types/auth.type";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const useUsers = (limit?: number, sort?: "asc" | "desc") => {
  const { data, error, isLoading, mutate } = useSWR(
    ["users", limit, sort],
    () => authService.getUsers(limit, sort),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    users: data as User[] | undefined,
    isLoading,
    error,
    mutate,
  };
};

export const useUser = (id: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ["user", id] : null,
    () => authService.getUser(id),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    user: data as User | undefined,
    isLoading,
    error,
    mutate,
  };
};

export default useAuth;
