"use client";

import { Button } from "@/components/button.component";
import { useCheckoutForm } from "../_hooks/checkout-form.hook";
import { CheckoutHeader } from "./checkout-header.component";
import { CheckoutSummary } from "./checkout-summary.component";
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

  return (
    <div className="min-h-screen bg-white lg:mt-20">
      <CheckoutHeader currentStep={currentStep} />

      <div className="container-lg mx-auto px-4 py-8">
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

            <CheckoutSummary
              cart={cart}
              currentStep={currentStep}
              subtotal={subtotal}
              shippingRate={shippingRate}
              tax={tax}
              orderTotal={orderTotal}
              selectedShipping={selectedShipping}
              shippingInfo={shippingInfo}
              handleBackToShipping={handleBackToShipping}
            />
          </div>
        )}
      </div>
    </div>
  );
}
