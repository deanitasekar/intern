"use client";

import { AuthRequest, RegisterRequest, User } from "@/types/auth.type";
import { usePathname, useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";
import React, { createContext, useCallback } from "react";
import getSuccessMessage from "@/utils/success.util";
import getErrorMessage from "@/utils/error.util";

export interface AuthContextType {
  user: User | undefined;
  loadingContext: boolean;
  isAuthenticated: boolean;
  login: (credentials: AuthRequest) => Promise<void>;
  logout: () => void;
  register: (credentials: RegisterRequest) => Promise<void>;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: undefined,
  loadingContext: false,
  isAuthenticated: false,
  login: async () => Promise.resolve(),
  logout: () => {},
  register: async () => Promise.resolve(),
  updateUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const ACCESS_TOKEN_KEY = "auth_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [loadingContext, setLoadingContext] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  console.log(user);

  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = Boolean(user);

  const login = async (credentials: AuthRequest): Promise<void> => {
    setLoadingContext(true);

    try {
      const response = await AuthService.login(credentials);

      localStorage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken || "");
      if (response.data.refreshToken) {
        localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
      }

      const userData: User = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        name: response.data.name,
        role: response.data.role,
        permissions: response.data.permissions,
      };

      setUser(userData);
      window.dispatchEvent(new Event("authStateChanged"));
      console.log(getSuccessMessage(response), "for user:", userData.username);
      router.replace("/dashboard");
    } catch (error) {
      console.error("Login error:", getErrorMessage(error));
      throw error;
    } finally {
      setLoadingContext(false);
    }
  };

  const clearToken = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    setUser(undefined);

    window.dispatchEvent(new Event("authStateChanged"));
  }, []);

  const logout = async () => {
    setLoadingContext(true);
    
    try {
      await AuthService.logout();
      console.log("Logout successful");
    } catch (error) {
      console.log("Logout error:", getErrorMessage(error));
    } finally {
      clearToken();

      router.replace("/login");
      setLoadingContext(false);
    }
  };

  React.useEffect(() => {
    setIsClient(true);

    const initializeAuth = async () => {
      setLoadingContext(true);

      try {
        const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (storedToken) {
          const response = await AuthService.me();

          const userData: User = {
            id: response.data.id,
            username: response.data.username,
            email: response.data.email,
            name: response.data.name,
            role: response.data.role,
            permissions: response.data.permissions,
          };

          setUser(userData);

          if (pathname === "/login") {
            router.replace("/dashboard");
          }
        } else {
          const protectedRoutes = ["/dashboard"];
          const isOnProtectedRoute = protectedRoutes.some((route) =>
            pathname.startsWith(route)
          );

          if (isOnProtectedRoute) {
            router.replace("/login");
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        clearToken();

        const protectedRoutes = ["/dashboard"];
        const isOnProtectedRoute = protectedRoutes.some((route) =>
          pathname.startsWith(route)
        );

        if (isOnProtectedRoute) {
          router.replace("/login");
        }
      } finally {
        setLoadingContext(false);
      }
    };

    initializeAuth();
  }, [pathname, router, clearToken]);

  const updateUser = (update: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...update };
      setUser(updatedUser);
      window.dispatchEvent(new Event("authStateChanged"));
    }
  };

  const register = async (credentials: RegisterRequest): Promise<void> => {
    setLoadingContext(true);

    try {
      const response = await AuthService.register(credentials);
      console.log(getSuccessMessage(response));

      router.replace("/login");
    } catch (error) {
      console.error("Registration error:", getErrorMessage(error));
      throw error;
    } finally {
      setLoadingContext(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    loadingContext,
    isAuthenticated,
    login,
    logout,
    register,
    updateUser,
  };


  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col justify-center items-center relative overflow-hidden">
        <div className="relative z-10 text-center">

          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-100 mx-auto">
              <div className="rounded-full h-16 w-16 border-4 border-transparent border-t-blue-600 border-r-blue-500"></div>
            </div>
            <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping"></div>
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              GoApp
            </h2>

            <div className="flex items-center justify-center space-x-1">
              <span className="text-gray-600 font-medium">Loading</span>
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-1 h-1 bg-blue-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>

            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Preparing your experience
            </p>
          </div>

          <div className="mt-8 w-64 mx-auto">
            <div className="bg-blue-100 rounded-full h-1 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2 opacity-40">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse delay-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
