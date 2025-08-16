"use client";

import { Button } from "@/components/button.component";
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
  shipping,
  total,
  onShippingChange,
  onCheckout,
}: CartSummaryProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Summary</h3>

      <Shipping onShippingChange={onShippingChange} />

      <div className="space-y-3 pb-4 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (11%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between text-lg font-bold mt-4 mb-6">
        <span>Order Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Button
        onClick={onCheckout}
        className="w-full bg-[#7DB800] hover:bg-[#6BA700] text-white py-3 text-base font-medium rounded"
      >
        Proceed to Checkout
      </Button>

      <p className="text-xs text-gray-500 text-center mt-3 underline cursor-pointer">
        Check Out with Multiple Addresses
      </p>
    </div>
  );
}
