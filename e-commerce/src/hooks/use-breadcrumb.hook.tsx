"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbConfig {
  [key: string]: {
    label: string;
    href?: string;
  };
}

const pathLabels: BreadcrumbConfig = {
  "/": { label: "Home" },
  "/products": { label: "Products" },
  "/products/[id]": { label: "Product Details" },
  "/cart": { label: "Shopping Cart" },
  "/checkout": { label: "Checkout" },
  "/checkout/review": { label: "Review & Payment" },
  "/checkout/success": { label: "Order Confirmation" },
  "/auth": { label: "Login" },
  "/register": { label: "Register" },
  "/about": { label: "About Us" },
  "/contact": { label: "Contact" },
  "/categories": { label: "Categories" },
  "/categories/[slug]": { label: "Category" },
  "/search": { label: "Search Results" },
  "/account": { label: "My Account" },
  "/account/orders": { label: "My Orders" },
  "/account/profile": { label: "Profile" },
  "/wishlist": { label: "Wishlist" },
};

export function useBreadcrumb(
  customItems?: BreadcrumbItem[]
): BreadcrumbItem[] {
  const pathname = usePathname();

  return useMemo(() => {
    if (customItems) {
      return customItems;
    }

    const pathSegments = pathname.split("/").filter(Boolean);

    if (pathSegments.length === 0) {
      return [{ label: "Home", href: "/", current: true }];
    }

    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      const isDynamicId = /^\d+$/.test(segment);

      let label = "";
      const href = currentPath;

      if (isDynamicId) {
        const parentPath = currentPath.replace(`/${segment}`, "/[id]");
        label = pathLabels[parentPath]?.label || "Details";
      } else {
        label =
          pathLabels[currentPath]?.label ||
          pathLabels[currentPath.replace(/\/\d+/, "/[id]")]?.label ||
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      }

      breadcrumbs.push({
        label,
        href: isLast ? undefined : href,
        current: isLast,
      });
    });

    return breadcrumbs;
  }, [pathname, customItems]);
}

export function createBreadcrumb(
  items: Array<{ label: string; href?: string }>
): BreadcrumbItem[] {
  return items.map((item, index) => ({
    ...item,
    current: index === items.length - 1,
  }));
}
