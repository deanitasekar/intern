"use client";

import { useAuthGuard } from "@/components/auth-middleware.component";
import { Button } from "@/components/button.component";
import { useAuth } from "@/hooks/use-auth.hook";
import { useCartOperations } from "../_hooks/cart-operations.hook";
import { Loader2, ShoppingCart } from "lucide-react";
import { CartHeader } from "./cart-header.component";
import { CartItem } from "./cart-item.component";
import { CartSummary } from "./cart-summary.component";
import { Discount } from "./discount.component";

export default function CartMain() {
  const { isAllowed, isLoading: authLoading } = useAuthGuard();
  const { user, isAuthenticated } = useAuth();
  
  const {
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
    removeItem,
    handleClearCart,
    
    // Calculations handlers
    handleShippingChange,
    
    // Cart actions
    handleApplyDiscount,
    handleUpdateCart,
    handleCheckout,
    handleContinueShopping,
  } = useCartOperations();

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
        <div className="container-lg mx-auto px-4 py-16">
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
        <div className="container-lg mx-auto px-4 sm:px-6 py-16">
          <div className="text-center">
            <ShoppingCart className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Add some products to get started!
            </p>
            <Button
              onClick={handleContinueShopping}
              className="bg-[#7DB800] hover:bg-[#6BA700] text-white px-6 py-2 sm:px-8 sm:py-3"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="container-lg mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-4">
          <div className="xl:col-span-3">
            <div className="bg-white">
              {/* Mobile Card Layout */}
              <div className="block lg:hidden space-y-4">
                {cart.map((product: any) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col space-y-3">
                      {/* Image and basic info row */}
                      <div className="flex space-x-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 overflow-hidden rounded flex-shrink-0">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="text-sm sm:text-base font-medium text-gray-900">
                              ${product.price.toFixed(2)}
                            </span>
                            <button 
                              className="text-xs text-gray-500 hover:text-red-600 underline"
                              onClick={() => removeItem(product.id)}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs sm:text-sm text-gray-500">
                              <div>Size: {"size" in product ? (product as any).size : "29"}</div>
                              <div>Color: {"color" in product ? (product as any).color : "Green"}</div>
                            </div>
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                onClick={() => {
                                  if (product.quantity > 1) {
                                    handleUpdateQuantity(product.id, product.quantity - 1);
                                  } else {
                                    removeItem(product.id);
                                  }
                                }}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="w-8 h-8 flex items-center justify-center text-sm">
                                {product.quantity}
                              </span>
                              <button
                                onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}
                                className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Product title below */}
                      <div className="space-y-2">
                        <h3 className="text-sm sm:text-base font-medium text-gray-900 leading-5">
                          {product.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">Subtotal:</span>
                          <span className="text-sm sm:text-base font-semibold text-gray-900">
                            ${(product.price * product.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table Layout */}
              <div className="hidden lg:block">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[800px]">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left px-2 py-3 text-sm font-medium text-gray-500 w-32">
                          Item
                        </th>
                        <th className="text-left py-3 text-sm font-medium text-gray-500 min-w-[200px]"></th>
                        <th className="text-left px-2 py-3 text-sm font-medium text-gray-500 w-24">
                          Price
                        </th>
                        <th className="text-left px-2 py-3 text-sm font-medium text-gray-500 w-24">
                          Qty
                        </th>
                        <th className="text-left px-2 py-3 text-sm font-medium text-gray-500 w-28">
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((product: any) => (
                        <CartItem
                          key={product.id}
                          product={product}
                          onUpdateQuantity={handleUpdateQuantity}
                          onRemove={removeItem}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Discount
              onApplyDiscount={handleApplyDiscount}
              onUpdateCart={handleUpdateCart}
            />
          </div>

          <div className="xl:col-span-1 xl:max-w-sm">
            <div className="sticky top-6">
              <CartSummary
                subtotal={subtotal}
                tax={tax}
                shipping={shippingRate}
                total={total}
                onShippingChange={handleShippingChange}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}