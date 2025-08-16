"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

export function AuthMiddleware({ children }: AuthMiddlewareProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || typeof window === "undefined") return;

    const publicPaths = ["/", "/auth", "/restricted"];

    const isPublicPath = publicPaths.some((path) => {
      if (path === "/") {
        return pathname === "/";
      }
      return pathname.startsWith(path);
    });

    if (!isPublicPath && !isAuthenticated) {
      const restrictedUrl = `/restricted?redirect=${encodeURIComponent(
        pathname
      )}`;
      router.push(restrictedUrl);
    }
  }, [pathname, isAuthenticated, isLoading, router]);

  return <>{children}</>;
}

export function useAuthGuard() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || typeof window === "undefined") return;

    const publicPaths = ["/", "/auth", "/restricted"];
    const isPublicPath = publicPaths.some((path) => {
      if (path === "/") return pathname === "/";
      return pathname.startsWith(path);
    });

    if (!isPublicPath && !isAuthenticated) {
      router.push(`/restricted?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, isAuthenticated, isLoading, router]);

  const isAllowed = isLoading
    ? false
    : isAuthenticated ||
      ["/", "/auth", "/restricted"].some((path) =>
        path === "/" ? pathname === "/" : pathname.startsWith(path)
      );

  return {
    isAuthenticated,
    isLoading,
    isAllowed,
  };
}
