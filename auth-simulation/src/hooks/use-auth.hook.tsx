"use client";

import { useContext } from "react";
import { AuthContext, type AuthContextType } from "@/contexts/auth.context";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
