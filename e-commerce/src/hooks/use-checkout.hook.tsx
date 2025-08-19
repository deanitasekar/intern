import { useState } from "react";

export interface CheckoutData {
  shipping: {
    firstName: string;
    lastName: string;
    company: string;
    streetAddress: string;
    country: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  billing: {
    sameAsShipping: boolean;
    firstName: string;
    lastName: string;
    company: string;
    streetAddress1: string;
    streetAddress2: string;
    country: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  shippingMethod: "fixed" | "table";
  paymentMethod: "check" | "credit" | "paypal";
}

export const useCheckout = () => {
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shipping: {
      firstName: "",
      lastName: "",
      company: "",
      streetAddress: "",
      country: "",
      state: "",
      zipCode: "",
      phone: ""
    },
    billing: {
      sameAsShipping: true,
      firstName: "",
      lastName: "",
      company: "",
      streetAddress1: "",
      streetAddress2: "",
      country: "",
      state: "",
      zipCode: "",
      phone: ""
    },
    shippingMethod: "fixed",
    paymentMethod: "check"
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  const updateShipping = (shippingData: Partial<CheckoutData['shipping']>) => {
    setCheckoutData(prev => ({
      ...prev,
      shipping: { ...prev.shipping, ...shippingData }
    }));
  };

  const updateBilling = (billingData: Partial<CheckoutData['billing']>) => {
    setCheckoutData(prev => ({
      ...prev,
      billing: { ...prev.billing, ...billingData }
    }));
  };

  const updateShippingMethod = (method: CheckoutData['shippingMethod']) => {
    setCheckoutData(prev => ({
      ...prev,
      shippingMethod: method
    }));
  };

  const updatePaymentMethod = (method: CheckoutData['paymentMethod']) => {
    setCheckoutData(prev => ({
      ...prev,
      paymentMethod: method
    }));
  };

  const goToNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const processOrder = async (cartData: any[], totalAmount: number) => {
    try {
      const newOrderNumber = `ORD${Date.now()}`;
      setOrderNumber(newOrderNumber);

      const orderData = {
        orderNumber: newOrderNumber,
        customer: checkoutData.shipping,
        billing: checkoutData.billing.sameAsShipping ? checkoutData.shipping : checkoutData.billing,
        shippingMethod: checkoutData.shippingMethod,
        paymentMethod: checkoutData.paymentMethod,
        items: cartData,
        total: totalAmount,
        date: new Date().toISOString()
      };

      console.log("Processing order:", orderData);

      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      return { success: true, orderNumber: newOrderNumber };
    } catch (error) {
      console.error("Error processing order:", error);
      return { success: false, error: "Failed to process order" };
    }
  };

  const resetCheckout = () => {
    setCheckoutData({
      shipping: {
        firstName: "",
        lastName: "",
        company: "",
        streetAddress: "",
        country: "",
        state: "",
        zipCode: "",
        phone: ""
      },
      billing: {
        sameAsShipping: true,
        firstName: "",
        lastName: "",
        company: "",
        streetAddress1: "",
        streetAddress2: "",
        country: "",
        state: "",
        zipCode: "",
        phone: ""
      },
      shippingMethod: "fixed",
      paymentMethod: "check"
    });
    setCurrentStep(1);
    setOrderNumber(null);
  };

  const getShippingCost = () => {
    return checkoutData.shippingMethod === "fixed" ? 5.00 : 15.00;
  };

  const validateShipping = () => {
    const { shipping } = checkoutData;
    return (
      shipping.firstName.trim() !== "" &&
      shipping.lastName.trim() !== "" &&
      shipping.streetAddress.trim() !== "" &&
      shipping.country.trim() !== "" &&
      shipping.state.trim() !== ""
    );
  };

  const validateBilling = () => {
    if (checkoutData.billing.sameAsShipping) {
      return validateShipping();
    }
    
    const { billing } = checkoutData;
    return (
      billing.firstName.trim() !== "" &&
      billing.lastName.trim() !== "" &&
      billing.streetAddress1.trim() !== "" &&
      billing.country.trim() !== "" &&
      billing.state.trim() !== ""
    );
  };

  return {
    checkoutData,
    currentStep,
    orderNumber,
    updateShipping,
    updateBilling,
    updateShippingMethod,
    updatePaymentMethod,
    goToNextStep,
    goToPreviousStep,
    processOrder,
    resetCheckout,
    getShippingCost,
    validateShipping,
    validateBilling
  };
};