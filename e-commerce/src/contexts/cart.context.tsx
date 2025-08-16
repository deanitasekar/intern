"use client";

import { Progress } from "@/components/progress.component";
import { Product } from "@/types/product.type";
import Image from "next/image";
import React, { createContext, useCallback } from "react";

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (productId: number) => boolean;
  getCartItem: (productId: number) => CartItem | undefined;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  isLoading: false,
  addToCart: () => {},
  updateQuantity: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotalItems: () => 0,
  getTotalPrice: () => 0,
  isInCart: () => false,
  getCartItem: () => undefined,
});

interface CartProviderProps {
  children: React.ReactNode;
}

const CART_STORAGE_KEY = "shopping_cart";

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = React.useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!isClient || !isLoading) return;
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isClient, isLoading]);

  const saveCartToStorage = useCallback((newCart: CartItem[]) => {
    if (isClient) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
      window.dispatchEvent(new Event("cartStateChanged"));
    }
  }, [isClient]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setIsLoading(true);

    try {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (cartItem) => cartItem.id === product.id
        );
        
        let newCart: CartItem[];

        if (existingItem) {
          newCart = prevCart.map((cartItem) =>
            cartItem.id === product.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          );
        } else {
          newCart = [...prevCart, { ...product, quantity }];
        }

        saveCartToStorage(newCart);
        console.log("Added to cart:", product.title);
        return newCart;
      });
    } catch (error) {
      console.error("Add to cart error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [saveCartToStorage]);

  const updateQuantity = useCallback((productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) => {
      const newCart = prevCart.map((cartItem) =>
        cartItem.id === productId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );

      saveCartToStorage(newCart);
      console.log("Updated quantity for product:", productId, "to:", newQuantity);
      return newCart;
    });
  }, [saveCartToStorage]);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id !== productId);
      saveCartToStorage(newCart);
      console.log("Removed from cart:", productId);
      return newCart;
    });
  }, [saveCartToStorage]);

  const clearCart = useCallback(() => {
    setCart([]);
    if (isClient) {
      localStorage.removeItem(CART_STORAGE_KEY);
      window.dispatchEvent(new Event("cartStateChanged"));
      console.log("Cart cleared");
    }
  }, [isClient]);

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const isInCart = useCallback((productId: number) => {
    return cart.some((item) => item.id === productId);
  }, [cart]);

  const getCartItem = useCallback((productId: number) => {
    return cart.find((item) => item.id === productId);
  }, [cart]);

  React.useEffect(() => {
    setIsClient(true);

    const initializeCart = async () => {
      setIsLoading(true);
      setProgress(0);

      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
          console.log("Cart loaded from storage:", parsedCart.length, "items");
        }
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        setCart([]);
      } finally {
        setIsLoading(false);
        setProgress(100);
      }
    };

    initializeCart();
  }, []);

  React.useEffect(() => {
    if (!isClient) return;

    const handleCartStateChange = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCart(parsedCart);
        } else {
          setCart([]);
        }
      } catch (error) {
        console.error("Error syncing cart state:", error);
      }
    };

    window.addEventListener("cartStateChanged", handleCartStateChange);
    window.addEventListener("storage", handleCartStateChange);

    return () => {
      window.removeEventListener("cartStateChanged", handleCartStateChange);
      window.removeEventListener("storage", handleCartStateChange);
    };
  }, [isClient]);

  React.useEffect(() => {
    console.log("Cart State Debug:", {
      cartItemsCount: cart.length,
      totalItems: getTotalItems(),
      totalPrice: getTotalPrice(),
      isLoading,
    });
  }, [cart, isLoading, getTotalItems, getTotalPrice]);

  const contextValue: CartContextType = {
    cart,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getCartItem,
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
            <p className="text-gray-400 text-sm">
              Preparing your experience
            </p>
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
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartProvider;