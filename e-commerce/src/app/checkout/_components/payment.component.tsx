import { Button } from "@/components/button.component";
import { Input } from "@/components/input.component";

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
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method:</h2>
      
      <div className="mb-6">
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="check"
            name="payment"
            value="check"
            checked={paymentMethod === "check"}
            onChange={(e) => setPaymentMethod(e.target.value as "check")}
            className="h-4 w-4 text-green-600"
          />
          <label htmlFor="check" className="ml-2 text-sm font-medium">
            Check / Money order
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="credit"
            name="payment"
            value="credit"
            checked={paymentMethod === "credit"}
            onChange={(e) => setPaymentMethod(e.target.value as "credit")}
            className="h-4 w-4 text-green-600"
          />
          <label htmlFor="credit" className="ml-2 text-sm font-medium">
            Credit Card
          </label>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="paypal"
            name="payment"
            value="paypal"
            checked={paymentMethod === "paypal"}
            onChange={(e) => setPaymentMethod(e.target.value as "paypal")}
            className="h-4 w-4 text-green-600"
          />
          <label htmlFor="paypal" className="ml-2 text-sm font-medium">
            PayPal
          </label>
        </div>

        {paymentMethod === "check" && (
          <div className="ml-6 p-4 bg-gray-50 rounded border">
            <div className="flex items-start mb-3">
              <input
                type="checkbox"
                id="sameAddress"
                className="h-4 w-4 text-green-600 mt-0.5"
                defaultChecked
              />
              <label htmlFor="sameAddress" className="ml-2 text-sm text-gray-700">
                My billing and shipping address are the same
              </label>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-medium">Veronica Costello</p>
              <p>6146 Honey Bluff Parkway</p>
              <p>Calder, Michigan, 49628-7978</p>
              <p>United States</p>
              <p>T: (555) 229-3326</p>
            </div>

            <button 
              className="mt-3 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded border border-gray-300"
              onClick={handleBackToShipping}
            >
              Edit
            </button>
          </div>
        )}

        {paymentMethod === "credit" && (
          <div className="ml-6 p-4 bg-gray-50 rounded border">
            <p className="text-sm text-gray-700 mb-3">
              Please enter your credit card information below.
            </p>
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="Card Number"
                className="w-full"
              />
              <div className="grid grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full"
                />
                <Input
                  type="text"
                  placeholder="CVV"
                  className="w-full"
                />
              </div>
              <Input
                type="text"
                placeholder="Cardholder Name"
                className="w-full"
              />
            </div>
          </div>
        )}

        {paymentMethod === "paypal" && (
          <div className="ml-6 p-4 bg-gray-50 rounded border">
            <p className="text-sm text-gray-700">
              You will be redirected to PayPal to complete your payment.
            </p>
          </div>
        )}
      </div>

      <div className="border-t pt-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-700 mb-2">Apply Discount Code</label>
            <div className="flex">
              <Input
                type="text"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="flex-1 rounded-r-none border-r-0"
                placeholder="SALE2020"
              />
              <Button
                onClick={handleApplyDiscount}
                className="bg-gray-800 hover:bg-gray-900 text-white px-6 rounded-l-none"
              >
                Apply Discount
              </Button>
            </div>
          </div>
          <div className="flex items-end">
            <Button
              onClick={handlePlaceOrder}
              className="bg-[#7DB800] hover:bg-lime-500 text-white px-8 py-2 text-base font-medium"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}