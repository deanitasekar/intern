"use client";

import { Button } from "@/components/button.component";
import { Input } from "@/components/input.component";
import { useState } from "react";

interface DiscountProps {
  onApplyDiscount: (code: string) => void;
  onUpdateCart: () => void;
}

export function Discount({ onApplyDiscount, onUpdateCart }: DiscountProps) {
  const [discountCode, setDiscountCode] = useState("SALE2020");

  const handleApplyDiscount = () => {
    onApplyDiscount(discountCode);
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apply Discount Code
          </label>
          <div className="flex">
            <Input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="SALE2020"
              className="flex-1 rounded-r-none border-r-0 focus-visible:ring-0 h-10"
            />
            <Button
              onClick={handleApplyDiscount}
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 rounded-l-none h-10"
            >
              Apply Discount
            </Button>
          </div>
        </div>

        <div className="flex items-end">
          <Button
            onClick={onUpdateCart}
            variant="outline"
            className="px-8 h-10 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Update Shopping Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
