"use client";

import { Progress } from "@/components/progress.component";
import { authService } from "@/services/auth.service";
import { LoginRequest, User } from "@/types/auth.type";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback } from "react";

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<any>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => Promise.resolve(),
  logout: () => {},
  updateUser: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

const ACCESS_TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

// Progress bar configuration
const PROGRESS_DURATION = 1800; // 2 seconds total
const PROGRESS_INTERVAL = 60; // Update every 50ms

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = Boolean(user);

  // Static progress animation
  const startProgressAnimation = useCallback(() => {
    setProgress(0);
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressPercentage = Math.min((elapsed / PROGRESS_DURATION) * 100, 100);
      
      setProgress(progressPercentage);
      
      if (progressPercentage >= 100) {
        clearInterval(interval);
      }
    }, PROGRESS_INTERVAL);

    return interval;
  }, []);

  const login = async (credentials: LoginRequest): Promise<any> => {
    setIsLoading(true);
    const progressInterval = startProgressAnimation();

    try {
      const response = await authService.login(credentials);

      setUser(response.user);
      window.dispatchEvent(new Event("authStateChanged"));
      
      console.log("Login successful for user:", response.user.username);
      
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      // Wait for progress animation to complete
      setTimeout(() => {
        setIsLoading(false);
        clearInterval(progressInterval);
      }, Math.max(0, PROGRESS_DURATION - (Date.now() % PROGRESS_DURATION)));
    }
  };

  const clearAuth = useCallback(() => {
    authService.logout();
    setUser(null);
    window.dispatchEvent(new Event("authStateChanged"));
  }, []);

  const logout = () => {
    setIsLoading(true);
    const progressInterval = startProgressAnimation();

    try {
      clearAuth();
      console.log("Logout successful");
      
      setTimeout(() => {
        router.replace("/auth");
        setIsLoading(false);
        clearInterval(progressInterval);
      }, PROGRESS_DURATION);
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
        clearInterval(progressInterval);
      }, PROGRESS_DURATION);
    }
  };

  const updateUser = useCallback(
    (update: Partial<User>) => {
      if (user) {
        const updatedUser = { ...user, ...update };
        setUser(updatedUser);
        localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("authStateChanged"));
        console.log("👤 User updated:", updatedUser);
      }
    },
    [user]
  );

  React.useEffect(() => {
    setIsClient(true);

    const initializeAuth = async () => {
      setIsLoading(true);
      const progressInterval = startProgressAnimation();

      try {
        const storedToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_DATA_KEY);

        if (storedToken && storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } else {
          const protectedRoutes = ["/products", "/elements", "/pages", "/shop", "/sale", "/checkout"];
          const isOnProtectedRoute = protectedRoutes.some((route) =>
            pathname.startsWith(route)
          );

          if (isOnProtectedRoute) {
            router.replace(`/restricted?redirect=${encodeURIComponent(pathname)}`);
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        clearAuth();

        const protectedRoutes = ["/products", "/elements", "/pages", "/shop", "/sale", "/checkout"];
        const isOnProtectedRoute = protectedRoutes.some((route) =>
          pathname.startsWith(route)
        );

        if (isOnProtectedRoute) {
          router.replace(`/restricted?redirect=${encodeURIComponent(pathname)}`);
        }
      } finally {
        // Always wait for full progress animation
        setTimeout(() => {
          setIsLoading(false);
          clearInterval(progressInterval);
        }, PROGRESS_DURATION);
      }
    };

    initializeAuth();
  }, [pathname, router, clearAuth, startProgressAnimation]);

  React.useEffect(() => {
    console.log("Auth State Debug:", {
      isAuthenticated,
      user: user ? { id: user.id, username: user.username } : null,
      isLoading,
      pathname,
    });
  }, [isAuthenticated, user, isLoading, pathname]);

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen bg-[#212121] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#7DB800] rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-[#7DB800] rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="text-center space-y-8 z-10 relative">
          <div className="mb-8 animate-pulse">
            <Image
              src="/logo.png"
              alt="Logo"
              width={200}
              height={30}
              className="object-contain mx-auto filter brightness-110"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">
              Preparing your experience
            </p>
          </div>
          
          <div className="w-80 max-w-md mx-auto space-y-3">
            <div className="relative">
              <Progress value={progress} className="h-3 bg-gray-700" />
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-gray-400 text-xs">
                {Math.round(progress)}% Complete
              </p>
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-[#7DB800] rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-[#7DB800] rounded-full animate-bounce delay-100"></div>
                <div className="w-1.5 h-1.5 bg-[#7DB800] rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
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