import { Button } from "@/components/button.component";
import { Input } from "@/components/input.component";
import { ChevronUp } from "lucide-react";

interface PaymentProps {
  paymentMethod: "check" | "credit" | "paypal";
  setPaymentMethod: (method: "check" | "credit" | "paypal") => void;
  discountCode: string;
  setDiscountCode: React.Dispatch<React.SetStateAction<string>>;
  shippingInfo: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  handleBackToShipping: () => void;
  handleApplyDiscount: () => void;
  handlePlaceOrder: () => void;
}

export default function Payment({
  paymentMethod,
  setPaymentMethod,
  discountCode,
  setDiscountCode,
  shippingInfo,
  handleBackToShipping,
  handleApplyDiscount,
  handlePlaceOrder,
}: PaymentProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Payment Method
      </h2>

      <div className="mb-8">
        <div className="mb-4">
          <div className="mb-2">
            <span className="text-sm text-gray-700">Check / Money order</span>
          </div>

          <div className="mt-4">
            <div className="flex items-center mb-4">
              <div className="w-4 h-4 bg-[#7DB800] rounded-sm flex items-center justify-center mr-3">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm text-gray-700 font-normal">
                My billing and shipping address are the same
              </span>
            </div>

            <div className="ml-7 text-sm text-gray-700 space-y-1 mb-4">
              <p className="font-normal">Veronica Costello</p>
              <p>6146 Honey Bluff Parkway</p>
              <p>Calder, Michigan, 49628-7978</p>
              <p>United States</p>
              <p>T: (555) 229-3326</p>
            </div>

            <div className="ml-7">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-[2px] font-bold"
                onClick={handleBackToShipping}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
        <div className="flex flex-col space-y-4 lg:flex-row lg:justify-between lg:items-end lg:space-y-0 lg:space-x-4">
          <div className="w-full lg:w-auto lg:flex-shrink-0 lg:max-w-sm">
            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
              Apply Discount Code
              <ChevronUp className="ml-2 h-4 w-4 text-gray-500" />
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <Input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                placeholder="SALE2020"
                className="flex-1 sm:rounded-r-none focus-visible:ring-0 h-10 text-sm font-base rounded-[0px] border border-gray-300"
              />
              <Button
                onClick={handleApplyDiscount}
                className="bg-[#212121] hover:bg-black text-white px-4 sm:px-6 sm:rounded-l-none rounded-[2px] h-10 text-sm font-bold w-full sm:w-auto"
              >
                Apply Discount
              </Button>
            </div>
          </div>

          <div className="w-full lg:w-auto">
            <Button
              onClick={handlePlaceOrder}
              className="w-full lg:w-auto px-4 sm:px-8 h-10 bg-[#7DB800] hover:bg-[#6BA700] text-white rounded-[2px] text-sm font-bold"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
