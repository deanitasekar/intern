"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  showHome?: boolean;
  separator?: React.ReactNode;
  variant?: "default" | "light" | "dark";
}

export function Breadcrumb({
  items,
  className,
  showHome = true,
  separator,
  variant = "default",
}: BreadcrumbsProps) {
  const allItems = showHome
    ? [{ label: "Home", href: "/", current: false }, ...items]
    : items;

  const variantStyles = {
    default: "text-gray-600 hover:text-gray-800",
    light: "text-gray-300 hover:text-white",
    dark: "text-gray-700 hover:text-gray-900",
  };

  const separatorElement = separator || <ChevronRight className="h-4 w-4" />;

  return (
    <nav className={cn("flex items-center", className)} aria-label="Breadcrumb">
      <ol className="flex items-center">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <span
                className={cn(
                  "mx-2 text-xs font-normal",
                  variantStyles[variant]
                )}
              >
                {separatorElement}
              </span>
            )}

            {item.current || !item.href ? (
              <span
                className={cn(
                  "text-xs font-normal",
                  item.current
                    ? variant === "light"
                      ? "text-white"
                      : "text-gray-900"
                    : variantStyles[variant]
                )}
                aria-current={item.current ? "page" : undefined}
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  "text-xs font-normal transition-colors",
                  variantStyles[variant]
                )}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
