"use client";

import { ChevronDown, ChevronUp, Edit } from "lucide-react";

type CheckoutStep = "shipping" | "review" | "success";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
}

interface CheckoutSummaryProps {
  cart: CartItem[];
  currentStep: CheckoutStep;
  subtotal: number;
  shippingRate: number;
  tax: number;
  orderTotal: number;
  selectedShipping: "fixed" | "table";
  shippingInfo: ShippingInfo;
  handleBackToShipping: () => void;
}

export function CheckoutSummary({
  cart,
  currentStep,
  subtotal,
  shippingRate,
  tax,
  orderTotal,
  selectedShipping,
  shippingInfo,
  handleBackToShipping,
}: CheckoutSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Order Summary
        </h3>

        {currentStep !== "success" && (
          <>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-300">
                <span className="text-sm text-gray-600">
                  {cart.length} Item{cart.length > 1 ? "s" : ""} in Cart
                </span>
                <button className="text-sm text-gray-600 hover:text-gray-800">
                  <ChevronUp className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex space-x-3">
                    <div className="w-16 h-16 bg-white rounded flex-shrink-0 p-2">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 mb-2 underline">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Qty: {item.quantity}
                      </p>
                      <button className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
                        View Details
                        <ChevronDown className="ml-1 h-3 w-3" />
                      </button>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Cart Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>${shippingRate.toFixed(2)}</span>
              </div>
              {currentStep === "shipping" && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (11%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              )}
              {currentStep === "review" && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {selectedShipping === "fixed"
                      ? "Flat Rate - Fixed"
                      : "Table Rate - Best Way"}
                  </span>
                </div>
              )}
              <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                <span>Order Total</span>
                <span>
                  $
                  {currentStep === "shipping"
                    ? orderTotal.toFixed(2)
                    : (subtotal + shippingRate).toFixed(2)}
                </span>
              </div>
            </div>
          </>
        )}

        {currentStep === "review" && (
          <>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Ship To:</h4>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={handleBackToShipping}
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              <div className="text-sm text-gray-700 space-y-1">
                <p className="font-medium">{shippingInfo.name}</p>
                <p>{shippingInfo.address}</p>
                <p>{shippingInfo.city}</p>
                <p>{shippingInfo.country}</p>
                <p>{shippingInfo.phone}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-900">Shipping Method:</h4>
                <button
                  className="text-blue-600 hover:underline"
                  onClick={handleBackToShipping}
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-700">
                {selectedShipping === "fixed"
                  ? "Flat Rate - Fixed"
                  : "Table Rate - Best Way"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}