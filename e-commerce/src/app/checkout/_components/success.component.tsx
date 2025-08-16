"use client";
import { Check } from "lucide-react";

interface SuccessProps {
  orderNumber: number;
  subtotal: number;
  shippingRate: number;
  shippingInfo: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  handleContinueShopping: () => void;
  handleViewOrders: () => void;
}

export default function Success({
  orderNumber,
  subtotal,
  shippingRate,
  shippingInfo,
  handleContinueShopping,
  handleViewOrders,
}: SuccessProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-lime-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-[#7DB800]" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Thank You for Your Order!
        </h2>
        <p className="text-lg text-gray-600 mb-2">
          Your order #{orderNumber} has been placed successfully.
        </p>
        <p className="text-gray-500">
          We'll send you an email confirmation shortly.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Order Summary
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Order Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-medium">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Total:</span>
                <span className="font-semibold text-lg">
                  ${(subtotal + shippingRate).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method:</span>
                <span>Check / Money Order</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-3">
              Shipping Information
            </h4>
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-medium">{shippingInfo.name}</p>
              <p>{shippingInfo.address}</p>
              <p>{shippingInfo.city}</p>
              <p>{shippingInfo.country}</p>
              <p>{shippingInfo.phone}</p>
              <p className="mt-3 text-gray-600">
                <span className="font-medium">Shipping Method:</span> Flat Rate
                - Fixed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-600 text-sm">
          Questions about your order? Contact us at{" "}
          <a
            href="mailto:support@simpleWood.com"
            className="text-blue-600 hover:underline"
          >
            support@simpleWood.com
          </a>{" "}
          or call{" "}
          <a href="tel:+1555229-3326" className="text-blue-600 hover:underline">
            (555) 229-3326
          </a>
        </p>
      </div>
    </div>
  );
}
