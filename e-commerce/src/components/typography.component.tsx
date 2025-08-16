import React from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "p"
    | "extrasmall"
    | "small"
    | "large"
    | "lead"
    | "muted";
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Typography({
  variant = "p",
  children,
  className,
  as,
  ...props
}: TypographyProps) {
  const getComponent = () => {
    if (as) return as;

    switch (variant) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return variant;
      case "p":
      case "extrasmall":
      case "small":
      case "large":
      case "lead":
      case "muted":
      default:
        return "p";
    }
  };

  const Component = getComponent();

  const variants = {
    h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
    h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    h4: "scroll-m-20 text-xl font-semibold tracking-tight",
    h5: "scroll-m-20 text-lg font-semibold tracking-tight",
    h6: "scroll-m-20 text-base font-semibold tracking-tight",
    p: "leading-7 [&:not(:first-child)]:mt-6",
    large: "text-lg font-semibold",
    small: "text-sm font-medium leading-none",
    extrasmall: "text-xs font-normal leading-none",
    muted: "text-sm text-muted-foreground",
    lead: "text-xl text-muted-foreground",
  };

  return (
    <Component className={cn(variants[variant], className)} {...props}>
      {children}
    </Component>
  );
}