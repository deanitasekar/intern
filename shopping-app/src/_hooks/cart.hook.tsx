import { useState, useEffect } from "react";
import type { CartType } from "../_types/cart.types";

const UseCart = () => {
  const [cart, setCart] = useState<CartType[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("shoppingCart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item: Omit<CartType, "quantity">) => {
    setCart((prevCart) => {
      const existingCart = prevCart.find((cartItem) => cartItem.id == item.id);

      let newCart;
      if (existingCart) {
        newCart = prevCart.map((carItem) =>
          carItem.id == item.id
            ? { ...carItem, quantity: carItem.quantity + 1 }
            : carItem
        );
      } else {
        newCart = [...prevCart, { ...item, quantity: 1 }];
      }

      localStorage.setItem("shoppingCart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => {
      const newCart = prevCart.filter((item) => item.id != id);
      localStorage.setItem("shoppingCart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return {
    data: {
      cart,
    },
    handler: {
      addToCart,
      removeFromCart,
      getTotalItems,
      getTotalPrice,
    },
  };
};

export default UseCart;
