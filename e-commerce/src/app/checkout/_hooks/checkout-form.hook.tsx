"use client";

import { useAuth } from "@/hooks/use-auth.hook";
import { useCart } from "@/hooks/use-cart.hook";
import { useCheckout } from "@/hooks/use-checkout.hook";
import { useRouter } from "next/navigation";
import { useState } from "react";

type CheckoutStep = 'shipping' | 'review' | 'success';

export const useCheckoutForm = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const { cart, getTotalPrice, clearCart } = useCart();
  const {
    checkoutData,
    updateShipping,
    updateShippingMethod,
    updatePaymentMethod,
    processOrder,
    getShippingCost,
    validateShipping,
    validateBilling
  } = useCheckout();
  
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [orderSummary, setOrderSummary] = useState<any>(null);
  const [discountCode, setDiscountCode] = useState("SALE2020");

  const [loginForm, setLoginForm] = useState({
    email: "daisy.watson@example.com",
    password: "****************",
    zipCode: ""
  });

  const shippingInfo = {
    name: `${checkoutData.shipping.firstName} ${checkoutData.shipping.lastName}` || "Veronica Costello",
    address: checkoutData.shipping.streetAddress1 || "6146 Honey Bluff Parkway",
    city: `${checkoutData.shipping.state}, ${checkoutData.shipping.country}` || "Calder, Michigan, 49628-7978",
    country: checkoutData.shipping.country || "United States",
    phone: checkoutData.shipping.phone || "T: (555) 229-3326"
  };

  const subtotal = getTotalPrice();
  const shippingRate = getShippingCost();
  const taxRate = 0.11;
  const tax = subtotal * taxRate;
  const orderTotal = subtotal + shippingRate + tax;

  const handleLogin = () => {
    console.log("Login with:", loginForm);
  };

  const handleNextToReview = () => {
    if (!validateShipping()) {
      alert("Please fill in all required fields");
      return;
    }
    setCurrentStep('review');
  };

  const handleBackToShipping = () => {
    setCurrentStep('shipping');
  };

  const handleBackToCart = () => {
    router.push('/cart');
  };

  const handleApplyDiscount = () => {
    console.log("Applying discount:", discountCode);
  };

  const handlePlaceOrder = async () => {
    console.log("Placing order...");
    
    try {
      const result = await processOrder(cart, orderTotal);
      
      if (result.success) {
        const realOrderSummary = {
          orderNumber: result.orderNumber,
          orderDate: new Date(),
          items: cart.map(item => ({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            total: item.price * item.quantity
          })),
          subtotal,
          shippingRate,
          tax,
          orderTotal,
          shippingMethod: checkoutData.shippingMethod === "fixed" ? "Fixed - Flat Rate" : "Table Rate - Best Way",
          paymentMethod: checkoutData.paymentMethod === "check" ? "Check / Money Order" : "Credit Card",
          shippingInfo: {
            name: `${checkoutData.shipping.firstName} ${checkoutData.shipping.lastName}`,
            company: checkoutData.shipping.company,
            address: checkoutData.shipping.streetAddress1,
            city: checkoutData.shipping.state,
            country: checkoutData.shipping.country,
            phone: checkoutData.shipping.phone
          }
        };

        setOrderSummary(realOrderSummary);
        clearCart();
        setCurrentStep('success');
      } else {
        alert("Failed to process order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order.");
    }
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  const handleViewOrders = () => {
    router.push('/account/orders');
  };

  return {
    currentStep,
    setCurrentStep,
    selectedShipping: checkoutData.shippingMethod,
    setSelectedShipping: updateShippingMethod,
    paymentMethod: checkoutData.paymentMethod,
    setPaymentMethod: updatePaymentMethod,
    discountCode,
    setDiscountCode,
    orderSummary,
    loginForm,
    setLoginForm,
    shippingForm: checkoutData.shipping,
    setShippingForm: updateShipping,
    shippingInfo,
    subtotal,
    shippingRate,
    tax,
    orderTotal,
    cart,
    isAuthenticated,
    user,
    router,
    handleLogin,
    handleNextToReview,
    handleBackToShipping,
    handleBackToCart,
    handleApplyDiscount,
    handlePlaceOrder,
    handleContinueShopping,
    handleViewOrders,
  };
};