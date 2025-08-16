"use client";

import { useAuthGuard } from "@/components/auth-middleware.component";
import { Button } from "@/components/button.component";
import { useAuth } from "@/hooks/use-auth.hook";
import { useCart } from "@/hooks/use-cart.hook";
import { Loader2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CartHeader } from "./cart-header.component";
import { CartItem } from "./cart-item.component";
import { CartSummary } from "./cart-summary.component";
import { Discount } from "./discount.component";

export default function CartMain() {
  const router = useRouter();
  const { isAllowed, isLoading: authLoading } = useAuthGuard();
  const { user, isAuthenticated } = useAuth();
  const {
    cart,
    isLoading,
    getTotalItems,
    getTotalPrice,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [shippingRate, setShippingRate] = useState(5.0);
  const [isUpdating, setIsUpdating] = useState(false);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#7DB800]" />
          <p className="text-gray-600">Checking access permissions</p>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <CartHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#7DB800] mb-4" />
            <p className="text-gray-600">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <CartHeader />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <ShoppingCart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Add some products to get started!
            </p>
            <Button
              onClick={() => router.push("/products")}
              className="bg-[#7DB800] hover:bg-[#6BA700] text-white"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = totalPrice;
  const taxRate = 0.11;
  const tax = subtotal * taxRate;
  const orderTotal = subtotal + tax;

  const handleUpdateQuantity = async (
    productId: number,
    newQuantity: number
  ) => {
    setIsUpdating(true);
    try {
      updateQuantity(productId, newQuantity);
      console.log(`Updated quantity for product ${productId} to ${newQuantity}`);
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveItem = async (productId: number) => {
    const product = cart.find((item) => item.id === productId);
    if (
      product &&
      window.confirm(`Remove "${product.title}" from your cart?`)
    ) {
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

  const handleApplyDiscount = (code: string) => {
    console.log("Applying discount code:", code);
  };

  const handleUpdateCart = () => {
    console.log("Cart state refreshed");
  };

  const handleShippingChange = (rate: number) => {
    setShippingRate(rate);
    console.log(`Shipping rate updated to: $${rate.toFixed(2)}`);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with cart:", cart);
    router.push("/checkout");
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

  return (
    <div className="min-h-screen bg-white">
      <CartHeader />

      {(isUpdating || isLoading) && (
        <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3">
            <Loader2 className="h-5 w-5 animate-spin text-[#7DB800]" />
            <span className="text-sm text-gray-600">
              {isLoading ? "Loading cart..." : "Updating cart..."}
            </span>
          </div>
        </div>
      )}

      <div className="container-lg mx-auto px-6 py-8">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Shopping Cart ({totalItems} items)
          </h1>
          {cart.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearCart}
              className="text-red-600 border-red-300 hover:bg-red-50"
              disabled={isUpdating}
            >
              Clear Cart
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-700">
                      Item
                    </th>
                    <th className="text-left py-3 text-sm font-medium text-gray-700"></th>
                    <th className="text-center py-3 text-sm font-medium text-gray-700">
                      Price
                    </th>
                    <th className="text-center py-3 text-sm font-medium text-gray-700">
                      Qty
                    </th>
                    <th className="text-center py-3 text-sm font-medium text-gray-700">
                      Subtotal
                    </th>
                    <th className="py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((product) => (
                    <CartItem
                      key={product.id}
                      product={product}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <Discount
              onApplyDiscount={handleApplyDiscount}
              onUpdateCart={handleUpdateCart}
            />
          </div>

          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              tax={tax}
              shipping={shippingRate}
              total={subtotal + tax + shippingRate}
              onShippingChange={handleShippingChange}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}