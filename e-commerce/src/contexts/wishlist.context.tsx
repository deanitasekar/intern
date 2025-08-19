"use client";

import { Progress } from "@/components/progress.component";
import { Product } from "@/types/product.type";
import Image from "next/image";
import React, { createContext, useCallback, useRef } from "react";

export interface WishlistItem extends Product {}

export interface WishlistContextType {
  wishlist: WishlistItem[];
  isLoading: boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  clearWishlist: () => void;
  getTotalItems: () => number;
  isInWishlist: (productId: number) => boolean;
  getWishlistItem: (productId: number) => WishlistItem | undefined;
  toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  isLoading: false,
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  clearWishlist: () => {},
  getTotalItems: () => 0,
  isInWishlist: () => false,
  getWishlistItem: () => undefined,
  toggleWishlist: () => {},
});

interface WishlistProviderProps {
  children: React.ReactNode;
}

const WISHLIST_STORAGE_KEY = "shopping_wishlist";

export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  const [wishlist, setWishlist] = React.useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const isInitialized = useRef(false);
  const isUpdatingFromStorage = useRef(false);

  React.useEffect(() => {
    if (isClient && isInitialized.current && !isUpdatingFromStorage.current) {
      saveWishlistToStorage(wishlist);
    } else {
      console.log("Conditions not met - skipping save");
    }
  }, [wishlist, isClient]);

  React.useEffect(() => {
    if (!isClient || !isLoading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isClient, isLoading]);

  const saveWishlistToStorage = useCallback(
    (newWishlist: WishlistItem[]) => {
      if (isClient) {
        try {
          const stringifiedData = JSON.stringify(newWishlist);
          localStorage.setItem(WISHLIST_STORAGE_KEY, stringifiedData);
          console.log("Successfully saved to localStorage");

          window.dispatchEvent(new Event("wishlistStateChanged"));
        } catch (error) {
          console.error("Error saving to localStorage:", error);
        }
      }
    },
    [isClient]
  );

  const addToWishlist = useCallback((product: Product) => {
    setIsLoading(true);

    try {
      setWishlist((prevWishlist) => {
        const existingItem = prevWishlist.find(
          (wishlistItem) => wishlistItem.id === product.id
        );

        if (existingItem) {
          console.log("Product already in wishlist:", product.title);
          return prevWishlist;
        }

        const newWishlist = [...prevWishlist, { ...product }];
        return newWishlist;
      });
    } catch (error) {
      console.error("Add to wishlist error:", error);
      throw error;
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    console.log("Removing from wishlist:", productId);

    setWishlist((prevWishlist) => {
      const newWishlist = prevWishlist.filter((item) => item.id !== productId);
      return newWishlist;
    });
  }, []);

  const clearWishlist = useCallback(() => {
    console.log("Clearing wishlist");
    setWishlist([]);

    if (isClient) {
      localStorage.removeItem(WISHLIST_STORAGE_KEY);
      window.dispatchEvent(new Event("wishlistStateChanged"));
    }
  }, [isClient]);

  const getTotalItems = useCallback(() => {
    return wishlist.length;
  }, [wishlist.length]);

  const isInWishlist = useCallback(
    (productId: number) => {
      return wishlist.some((item) => item.id === productId);
    },
    [wishlist]
  );

  const getWishlistItem = useCallback(
    (productId: number) => {
      return wishlist.find((item) => item.id === productId);
    },
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    },
    [isInWishlist, removeFromWishlist, addToWishlist]
  );

  React.useEffect(() => {
    setIsClient(true);

    const initializeWishlist = async () => {
      setIsLoading(true);
      setProgress(0);
      isUpdatingFromStorage.current = true;

      try {
        const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
        console.log(
          "📦 Raw localStorage data:",
          savedWishlist ? "found" : "empty"
        );

        if (savedWishlist) {
          const parsedWishlist = JSON.parse(savedWishlist);
          setWishlist(parsedWishlist);
        }
      } catch (error) {
        console.error("Error parsing wishlist:", error);
        setWishlist([]);
      } finally {
        setIsLoading(false);
        setProgress(100);
        isInitialized.current = true;
        isUpdatingFromStorage.current = false;
        console.log("Wishlist initialization complete");
      }
    };

    initializeWishlist();
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    const handleWishlistStateChange = () => {
      console.log("Syncing wishlist state from storage event");
      isUpdatingFromStorage.current = true;

      try {
        const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
        if (savedWishlist) {
          const parsedWishlist = JSON.parse(savedWishlist);
          setWishlist(parsedWishlist);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        console.error("Error syncing wishlist state:", error);
      } finally {
        setTimeout(() => {
          isUpdatingFromStorage.current = false;
        }, 100);
      }
    };

    window.addEventListener("wishlistStateChanged", handleWishlistStateChange);
    window.addEventListener("storage", handleWishlistStateChange);

    return () => {
      window.removeEventListener(
        "wishlistStateChanged",
        handleWishlistStateChange
      );
      window.removeEventListener("storage", handleWishlistStateChange);
    };
  }, [isClient]);

  const contextValue: WishlistContextType = {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    getTotalItems,
    isInWishlist,
    getWishlistItem,
    toggleWishlist,
  };

  if (!isClient) {
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
            <p className="text-gray-400 text-sm">Preparing your experience</p>
          </div>

          <div className="w-80 max-w-md mx-auto space-y-3">
            <div className="relative">
              <Progress value={progress} className="h-3 bg-gray-700" />
              <div
                className="absolute top-0 left-0 h-3 bg-gradient-to-r from-[#7DB800] to-[#9ACD32] rounded-full transition-all duration-300 ease-out opacity-30 blur-sm"
                style={{ width: `${progress}%` }}
              ></div>
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
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export { WishlistContext };
export default WishlistProvider;
