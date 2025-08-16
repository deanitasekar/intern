"use client";

import { Badge } from "@/components/badge.component";
import { Button } from "@/components/button.component";
import { Input } from "@/components/input.component";
import { useAuth } from "@/hooks/use-auth.hook";
import { useCart } from "@/hooks/use-cart.hook";
import {
  ChevronDown,
  Menu,
  Search,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { EnhancedSearch } from "./search-bar.component";
import { Typography } from "./typography.component";

const HeartIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const UserIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="8" r="3"/>
    <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855"/>
  </svg>
);

const ShoppingBagIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="7" width="18" height="13" rx="2" ry="2"/>
    <path d="M8 7V5a4 4 0 0 1 8 0v2"/>
  </svg>
);

interface HeaderProps {
  currentPage?:
    | "home"
    | "products"
    | "elements"
    | "pages"
    | "shop"
    | "sale"
    | "auth"
    | "restricted"
    | "checkout";
}

export function Navbar({ currentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const { isAuthenticated, user } = useAuth();
  const { getTotalItems, isLoading: cartLoading } = useCart();

  const totalItems = getTotalItems();

  const getCurrentPage = (): string => {
    if (currentPage) return currentPage;

    if (pathname === "/") return "home";
    if (pathname.startsWith("/products")) return "products";
    if (pathname.startsWith("/elements")) return "elements";
    if (pathname.startsWith("/pages")) return "pages";
    if (pathname.startsWith("/shop")) return "shop";
    if (pathname.startsWith("/sale")) return "sale";
    if (pathname.startsWith("/auth")) return "auth";
    if (pathname.startsWith("/cart")) return "cart";
    if (pathname.startsWith("/checkout")) return "checkout";
    if (pathname.startsWith("/restricted")) return "restricted";

    return "home";
  };

  const activePage = getCurrentPage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Navbar - Cart items count:", totalItems);
    }
  }, [totalItems, isAuthenticated]);

  const isHomePage = activePage === "home";
  const isAuthPage = activePage === "auth";
  const isCartPage = activePage === "cart";
  const isCheckoutPage = activePage === "checkout";
  const isRestrictedPage = activePage === "restricted";
  const shouldBeTransparent =
    isHomePage &&
    !isScrolled &&
    !isAuthPage &&
    !isCartPage &&
    !isCheckoutPage &&
    !isRestrictedPage;

  const navItems = [
    { name: "Home", key: "home", href: "/", requireAuth: false },
    { name: "Products", key: "products", href: "/products", requireAuth: true },
    { name: "Elements", key: "elements", href: "/elements", requireAuth: true },
    { name: "Pages", key: "pages", href: "/pages", requireAuth: true },
    { name: "Shop", key: "shop", href: "/shop", requireAuth: true },
    { name: "Sale", key: "sale", href: "/sale", requireAuth: true },
  ];

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  const handleNavigation = (item: any, e: React.MouseEvent) => {
    if (item.requireAuth && !isAuthenticated) {
      e.preventDefault();
      window.location.href = `/restricted`;
    }
  };

  const handleCartNavigation = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      window.location.href = `/restricted?redirect=${encodeURIComponent(
        "/cart"
      )}`;
    } else {
      console.log("Navigating to cart with items:", totalItems);
    }
  };

  const CartBadge = ({ className = "" }: { className?: string }) => {
    if (!isAuthenticated) {
      return null;
    }

    const displayCount = cartLoading ? "..." : totalItems;

    if (totalItems === 0 && !cartLoading) {
      return (
        <Badge
          variant="default"
          className={`absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gray-500 text-white border-0 ${className}`}
        >
          0
        </Badge>
      );
    }

    return (
      <Badge
        variant="default"
        className={`absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[#7DB800] text-white border-0 ${className}`}
      >
        {cartLoading ? "..." : totalItems > 99 ? "99+" : totalItems}
      </Badge>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          shouldBeTransparent
            ? "bg-transparent backdrop-blur-none"
            : "bg-[#212121] backdrop-blur supports-[backdrop-filter]:bg-[#212121] border-b border-gray-800"
        }`}
      >
        <div className="container-lg mx-auto px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            
            <div className="flex md:hidden w-full items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className={`p-2 hover:bg-white/10 ${
                  shouldBeTransparent ? "text-gray-800" : "text-white"
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>

              <Link href="/" className="flex items-center flex-1 justify-center">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={118}
                  height={18}
                  className="object-contain"
                />
              </Link>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`p-2 hover:bg-white/10 ${
                    shouldBeTransparent ? "text-gray-800" : "text-white"
                  }`}
                >
                  <Search className="h-5 w-5" />
                </Button>

                {isAuthenticated ? (
                  <Link href="/cart">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`relative p-2 hover:bg-white/10 ${
                        shouldBeTransparent ? "text-gray-800" : "text-white"
                      }`}
                      onClick={handleCartNavigation}
                    >
                      <ShoppingBagIcon className="h-5 w-5" />
                      <CartBadge />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative p-2 hover:bg-white/10 ${
                      shouldBeTransparent ? "text-gray-800" : "text-white"
                    }`}
                    onClick={handleCartNavigation}
                  >
                    <ShoppingBagIcon className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>

            <div className="hidden md:flex w-full items-center justify-between">
              <div className="hidden lg:flex flex-1 max-w-xs">
                <EnhancedSearch
                  placeholder="Search"
                  onSearch={handleSearch}
                  className="w-full"
                />
              </div>

              <div className="flex-1 lg:flex-none flex justify-center">
                <Link href="/" className="flex justify-center items-center">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={118}
                    height={18}
                    className="object-contain"
                  />
                </Link>
              </div>

              <div className="flex items-center space-x-2 flex-1 lg:flex-none justify-end">
                <div className="hidden lg:flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-white hover:text-[#7DB800] hover:bg-white/10"
                  >
                    English
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm text-white hover:text-[#7DB800] hover:bg-white/10"
                  >
                    USD
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-[#7DB800] hover:bg-white/10"
                >
                  <HeartIcon className="h-5 w-5" />
                </Button>

                <Link href="/auth">
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`hover:text-[#7DB800] hover:bg-white/10 ${
                      isAuthPage ? "text-[#7DB800]" : "text-white"
                    }`}
                    title={
                      isAuthenticated
                        ? `Logged in as ${user?.username}`
                        : "Login"
                    }
                  >
                    <UserIcon className="h-5 w-5" />
                  </Button>
                </Link>

                {isAuthenticated ? (
                  <Link href="/cart">
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`relative hover:text-[#7DB800] hover:bg-white/10 ${
                        isCartPage ? "text-[#7DB800]" : "text-white"
                      }`}
                      onClick={handleCartNavigation}
                    >
                      <ShoppingBagIcon className="h-5 w-5" />
                      <CartBadge className="-top-2 -right-2" />
                    </Button>
                  </Link>
                ) : (
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`relative hover:text-[#7DB800] hover:bg-white/10 ${
                      isCartPage ? "text-[#7DB800]" : "text-white"
                    }`}
                    onClick={handleCartNavigation}
                  >
                    <ShoppingBagIcon className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <nav className="flex justify-center space-x-8 py-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(e) => handleNavigation(item, e)}
                >
                  <Button
                    variant="ghost"
                    className={`
                      text-sm font-medium transition-all duration-200 
                      relative pb-2 border-b-2 border-transparent
                      hover:border-b-[#7DB800] hover:bg-transparent hover:text-[#7DB800]
                      ${
                        activePage === item.key
                          ? "text-[#7DB800] !border-b-[#7DB800]"
                          : "text-white"
                      }
                      ${
                        item.requireAuth && !isAuthenticated ? "opacity-60" : ""
                      }
                    `}
                    style={{
                      borderRadius: 0,
                      fontWeight: "400",
                    }}
                    title={
                      item.requireAuth && !isAuthenticated
                        ? `Login required to access ${item.name}`
                        : undefined
                    }
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-[#212121] shadow-lg">
            
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-700">
              <Typography variant="h5" className="font-bold text-white">
                Menu
              </Typography>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={(e) => {
                    handleNavigation(item, e);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block"
                >
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left h-12 px-4 text-base font-medium ${
                      activePage === item.key
                        ? "text-[#7DB800] bg-[#7DB800]/10 border-l-4 border-[#7DB800]"
                        : "text-white hover:text-[#7DB800] hover:bg-white/5"
                    } ${
                      item.requireAuth && !isAuthenticated 
                        ? "opacity-60 cursor-not-allowed" 
                        : ""
                    }`}
                  >
                    {item.name}
                    {item.requireAuth && !isAuthenticated && (
                      <span className="ml-auto text-xs text-gray-400">
                        Login required
                      </span>
                    )}
                  </Button>
                </Link>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-700 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 pr-4 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 focus:border-[#7DB800] focus:ring-[#7DB800]"
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 h-10 border border-gray-600 text-white hover:bg-[#7DB800] hover:text-white hover:border-[#7DB800] transition-colors"
                >
                  English
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 h-10 border border-gray-600 text-white hover:bg-[#7DB800] hover:text-white hover:border-[#7DB800] transition-colors"
                >
                  USD
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
              </div>

              {isAuthenticated && (
                <div className="pt-2 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <UserIcon className="h-4 w-4 text-[#7DB800]" />
                      <span className="text-white">{user?.username}</span>
                    </div>
                    <Link href="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white text-xs"
                      >
                        Logout
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div
        className={`${
          shouldBeTransparent
            ? "h-0"
            : isAuthPage || isRestrictedPage || isCheckoutPage
            ? "h-16"
            : "h-16 md:h-32"
        }`}
      />
    </>
  );
}