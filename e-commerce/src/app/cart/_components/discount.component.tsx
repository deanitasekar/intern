"use client";

import { Button } from "@/components/button.component";
import { Input } from "@/components/input.component";
import { ChevronDown } from "lucide-react";
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
    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
      <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-end lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-auto lg:flex-shrink-0 lg:max-w-sm">
          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            Apply Discount Code
            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            <Input
              type="text"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="SALE2020"
              className="flex-1 sm:rounded-r-none focus-visible:ring-0 h-10 text-sm font-base rounded-[0px]"
            />
            <Button
              onClick={handleApplyDiscount}
              className="bg-[#212121] hover:bg-black text-white px-4 sm:px-6 sm:rounded-l-none rounded-[0px] h-10 text-sm font-bold w-full sm:w-auto"
            >
              Apply Discount
            </Button>
          </div>
        </div>

        <div className="w-full lg:w-auto">
          <Button
            onClick={onUpdateCart}
            variant="outline"
            className="w-full lg:w-auto px-4 sm:px-8 h-10 bg-gray-200 border-gray-200 text-gray-900 hover:bg-gray-50 rounded-[0px] text-sm font-bold"
          >
            Update Shopping Cart
          </Button>
        </div>
      </div>
    </div>
  );
}