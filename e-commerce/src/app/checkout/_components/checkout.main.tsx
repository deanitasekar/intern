"use client";

import { Breadcrumb } from "@/components/breadcrumb.component";
import { Button } from "@/components/button.component";
import { Check, ChevronDown, ChevronUp, Edit } from "lucide-react";
import { useCheckoutForm } from "../_hooks/checkout-form.hook";
import Payment from "./payment.component";
import Shipping from "./shipping.component";
import Success from "./success.component";

export default function CheckoutMain() {
  const {
    currentStep,
    selectedShipping,
    setSelectedShipping,
    paymentMethod,
    setPaymentMethod,
    discountCode,
    setDiscountCode,
    orderSummary,
    loginForm,
    setLoginForm,
    shippingForm,
    setShippingForm,
    shippingInfo,
    subtotal,
    shippingRate,
    tax,
    orderTotal,
    cart,
    isAuthenticated,
    router,
    handleLogin,
    handleNextToReview,
    handleBackToShipping,
    handleBackToCart,
    handleApplyDiscount,
    handlePlaceOrder,
    handleContinueShopping,
    handleViewOrders,
  } = useCheckoutForm();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Please Login
          </h1>
          <p className="text-gray-600 mb-8">You need to login to checkout</p>
          <Button onClick={() => router.push("/auth")}>Login</Button>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && currentStep !== "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some items to your cart first
          </p>
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const ProgressSteps = () => (
    <div className="py-4 pb-8">
      <div className="container-lg mx-auto px-4">
        <div className="flex items-start justify-center space-x-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                currentStep === "shipping"
                  ? "bg-[#7DB800]"
                  : currentStep === "review" || currentStep === "success"
                  ? "bg-[#7DB800]"
                  : "bg-gray-300"
              }`}
            >
              {currentStep === "review" || currentStep === "success" ? (
                <Check className="h-4 w-4" />
              ) : (
                "1"
              )}
            </div>
            <span
              className={`mt-2 text-sm font-medium max-w-16 justify-center text-center ${
                currentStep === "shipping" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Shipping
            </span>
          </div>

          <div
            className={`w-24 h-0.5 mt-4 ${
              currentStep === "review" || currentStep === "success"
                ? "bg-[#7DB800]"
                : "bg-gray-300"
            }`}
          ></div>

          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                currentStep === "review"
                  ? "bg-[#7DB800]"
                  : currentStep === "success"
                  ? "bg-[#7DB800]"
                  : "bg-gray-300"
              }`}
            >
              {currentStep === "success" ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <span
              className={`mt-2 text-sm font-medium max-w-20 justify-center text-center ${
                currentStep === "review" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Review & Payments
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const OrderSummary = () => (
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

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: currentStep === "success" ? "Order Confirmation" : "Checkout",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container-lg mx-auto px-6 lg:py-8 lg:mt-20">
        <div className="py-2">
          <Breadcrumb
            items={breadcrumbItems}
            separator=" > "
            className="text-sm"
          />
        </div>

        {currentStep !== "success" && <ProgressSteps />}

        <div className="container mx-auto px-4 py-8">
          {currentStep === "success" && orderSummary && (
            <Success
              orderNumber={orderSummary.orderNumber}
              subtotal={orderSummary.subtotal}
              shippingRate={orderSummary.shippingRate}
              shippingInfo={orderSummary.shippingInfo}
              handleContinueShopping={handleContinueShopping}
              handleViewOrders={handleViewOrders}
            />
          )}

          {currentStep !== "success" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {currentStep === "shipping" && (
                  <Shipping
                    loginForm={loginForm}
                    setLoginForm={setLoginForm}
                    shippingForm={shippingForm}
                    setShippingForm={setShippingForm}
                    selectedShipping={selectedShipping}
                    setSelectedShipping={setSelectedShipping}
                    handleLogin={handleLogin}
                    handleBackToCart={handleBackToCart}
                    handleNextToReview={handleNextToReview}
                  />
                )}

                {currentStep === "review" && (
                  <Payment
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}
                    discountCode={discountCode}
                    setDiscountCode={setDiscountCode}
                    shippingInfo={shippingInfo}
                    handleBackToShipping={handleBackToShipping}
                    handleApplyDiscount={handleApplyDiscount}
                    handlePlaceOrder={handlePlaceOrder}
                  />
                )}
              </div>

              <OrderSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
