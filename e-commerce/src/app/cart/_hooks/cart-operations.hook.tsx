import { useState } from "react";
import { useRouter } from "next/navigation";
import useCart from "@/hooks/use-cart.hook";

interface CartManagerOptions {
  taxRate?: number;
  defaultShippingRate?: number;
}

export function useCartOperations(options: CartManagerOptions = {}) {
  const { taxRate = 0.11, defaultShippingRate = 5.0 } = options;
  const router = useRouter();

  const [isUpdating, setIsUpdating] = useState(false);
  const [shippingRate, setShippingRate] = useState(defaultShippingRate);

  const {
    cart,
    isLoading,
    getTotalItems,
    getTotalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const subtotal = getTotalPrice();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingRate;
  const totalItems = getTotalItems();

  const handleUpdateQuantity = async (
    productId: number,
    newQuantity: number
  ) => {
    setIsUpdating(true);
    try {
      updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (productId: number, productTitle: string) => {
    if (window.confirm(`Remove "${productTitle}" from your cart?`)) {
      setIsUpdating(true);
      try {
        removeFromCart(productId);
      } catch (error) {
        console.error("Error removing item:", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your entire cart?")) {
      setIsUpdating(true);
      try {
        clearCart();
      } catch (error) {
        console.error("Error clearing cart:", error);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  const handleShippingChange = (rate: number) => {
    setShippingRate(rate);
    console.log(`Shipping rate updated to: $${rate.toFixed(2)}`);
  };

  const handleApplyDiscount = (code: string) => {
    console.log("Applying discount code:", code);
  };

  const handleUpdateCart = () => {
    console.log("Cart state refreshed");
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with cart:", cart);
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  const removeItem = (productId: number) => {
    const product = cart.find((item: any) => item.id === productId);
    if (product) {
      handleRemoveItem(productId, product.title);
    }
  };

  return {
    cart,
    isLoading,
    isUpdating,
    totalItems,
    subtotal,
    tax,
    shippingRate,
    total,
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    removeItem,
    handleShippingChange,
    handleApplyDiscount,
    handleUpdateCart,
    handleCheckout,
    handleContinueShopping,
  };
}
