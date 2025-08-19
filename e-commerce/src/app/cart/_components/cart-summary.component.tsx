"use client";

import { Button } from "@/components/button.component";
import { ChevronUp } from "lucide-react";
import { Shipping } from "./shipping.component";

interface CartSummaryProps {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  onShippingChange: (rate: number) => void;
  onCheckout: () => void;
}

export function CartSummary({
  subtotal,
  tax,
  total,
  onShippingChange,
  onCheckout,
}: CartSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
        Summary
      </h3>

      <div className="border-b border-gray-200 mb-4 sm:mb-6"></div>

      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <span className="text-sm font-medium text-gray-600">
          Estimate Shipping and Tax
        </span>
        <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
      </div>

      <Shipping onShippingChange={onShippingChange} />

      <div className="space-y-2 sm:space-y-3 py-3 sm:py-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600 font-base">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 font-base">
          <span>Tax (11%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between text-base sm:text-lg font-medium py-3 sm:py-4 border-t border-gray-200">
        <span>Order Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Button
        onClick={onCheckout}
        className="w-full bg-[#7DB800] hover:bg-[#6BA700] text-white py-3 sm:py-4 text-sm sm:text-base font-bold mt-3 sm:mt-4 rounded"
      >
        Proceed to Checkout
      </Button>

      <p className="text-xs text-gray-500 text-center mt-2 sm:mt-3 underline cursor-pointer">
        Check Out with Multiple Addresses
      </p>
    </div>
  );
}
