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
  
  // Cart operations state
  const [isUpdating, setIsUpdating] = useState(false);
  const [shippingRate, setShippingRate] = useState(defaultShippingRate);
  
  // Base cart functionality
  const {
    cart,
    isLoading,
    getTotalItems,
    getTotalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  // Calculations
  const subtotal = getTotalPrice();
  const tax = subtotal * taxRate;
  const total = subtotal + tax + shippingRate;
  const totalItems = getTotalItems();

  // Cart Operations
  const handleUpdateQuantity = async (
    productId: number,
    newQuantity: number
  ) => {
    setIsUpdating(true);
    try {
      updateQuantity(productId, newQuantity);
      console.log(
        `Updated quantity for product ${productId} to ${newQuantity}`
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (productId: number, productTitle: string) => {
    if (window.confirm(`Remove "${productTitle}" from your cart?`)) {
      setIsUpdating(true);
      try {
        removeFromCart(productId);
        console.log(`Removed product ${productId} from cart`);
      } catch (error) {
        console.error("Error removing item:", error);
        alert("Failed to remove item. Please try again.");
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
        console.log("Cart cleared successfully");
      } catch (error) {
        console.error("Error clearing cart:", error);
        alert("Failed to clear cart. Please try again.");
      } finally {
        setIsUpdating(false);
      }
    }
  };

  // Shipping and calculations
  const handleShippingChange = (rate: number) => {
    setShippingRate(rate);
    console.log(`Shipping rate updated to: $${rate.toFixed(2)}`);
  };

  // Cart Actions
  const handleApplyDiscount = (code: string) => {
    console.log("Applying discount code:", code);
    // TODO: Implement discount logic
  };

  const handleUpdateCart = () => {
    console.log("Cart state refreshed");
    // TODO: Implement cart refresh logic
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with cart:", cart);
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    router.push("/products");
  };

  // Helper for remove item that finds product title
  const removeItem = (productId: number) => {
    const product = cart.find((item: any) => item.id === productId);
    if (product) {
      handleRemoveItem(productId, product.title);
    }
  };

  return {
    // Cart data
    cart,
    isLoading,
    isUpdating,
    totalItems,
    
    // Calculations
    subtotal,
    tax,
    shippingRate,
    total,
    
    // Cart operations
    handleUpdateQuantity,
    handleRemoveItem,
    handleClearCart,
    removeItem,
    
    // Calculations handlers
    handleShippingChange,
    
    // Cart actions
    handleApplyDiscount,
    handleUpdateCart,
    handleCheckout,
    handleContinueShopping,
  };
}