"use client";

import { Plus, Minus } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  product: {
    id: number;
    title: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
    color?: string;
  };
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export function CartItem({
  product,
  onUpdateQuantity,
  onRemove,
}: CartItemProps) {
  const handleQuantityIncrease = () => {
    onUpdateQuantity(product.id, product.quantity + 1);
  };

  const handleQuantityDecrease = () => {
    if (product.quantity > 1) {
      onUpdateQuantity(product.id, product.quantity - 1);
    } else {
      onRemove(product.id);
    }
  };

  const subtotal = product.price * product.quantity;

  return (
    <tr>
      <td className="py-4">
        <div className="w-30 h-30 bg-gray-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={30}
            height={30}
            className="w-full h-full object-contain p-2"
          />
        </div>
        <div className="mt-3">
          <button className="text-sm font-normal text-gray-500 hover:text-gray-700 underline">
            Move to Wishlist
          </button>
        </div>
      </td>

      <td className="pt-4 pb-4" style={{ verticalAlign: "top", width: "50px" }}>
        <div>
          <h3 className="text-lg font-normal text-gray-900 underline mb-2">
            {product.title}
          </h3>
          <div className="text-sm text-gray-500 space-y-1">
            <div>
              <span className="font-bold">Size:</span>
              <span className="ml-2 font-normal ">{product.size || "29"}</span>
            </div>
            <div>
              <span className="font-bold">Color:</span>
              <span className="ml-2 font-normal">
                {product.color || "Green"}
              </span>
            </div>
          </div>
        </div>
      </td>

      <td className="py-4 px-2" style={{ verticalAlign: "top", width: "80px" }}>
        <div className="w-20 text-left">
          <span className="text-lg font-medium text-gray-900 inline-block min-w-[4rem]">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </td>

      <td className="py-4 px-2" style={{ verticalAlign: "top", width: "1%" }}>
        <div className="flex items-start">
          <div className="flex items-center border border-gray-300">
            <button
              onClick={handleQuantityDecrease}
              className="w-6 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>

            <span className="w-8 h-8 flex items-center justify-center text-sm font-medium bg-white">
              {product.quantity}
            </span>

            <button
              onClick={handleQuantityIncrease}
              className="w-6 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </td>

      <td
        className="py-4 px-2"
        style={{ verticalAlign: "top", width: "120px" }}
      >
        <div className="w-24 text-left">
          <span className="text-lg font-medium text-gray-900 inline-block min-w-[5rem]">
            ${subtotal.toFixed(2)}
          </span>
        </div>
      </td>
    </tr>
  );
}
