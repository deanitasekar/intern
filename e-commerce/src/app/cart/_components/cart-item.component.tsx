"use client";

import { Plus, Minus } from "lucide-react";

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
      <td className="py-4 pr-4">
        <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-2"
          />
        </div>
        <div className="mt-3">
          <button className="text-sm text-gray-500 hover:text-gray-700 underline">
            Move to Wishlist
          </button>
        </div>
      </td>

      <td className="pt-4 pb-4 px-4" style={{ verticalAlign: "top" }}>
        <div>
          <h3 className="text-sm font-medium text-gray-900 underline mb-2">
            {product.title}
          </h3>
          <div className="text-xs text-gray-600 space-y-1">
            <div>
              <span className="font-medium">Size:</span>
              <span className="ml-1 text-gray-800">{product.size || "29"}</span>
            </div>
            <div>
              <span className="font-medium">Color:</span>
              <span className="ml-1 text-gray-800">
                {product.color || "Green"}
              </span>
            </div>
          </div>
        </div>
      </td>

      <td className="py-4 px-4 text-center" style={{ verticalAlign: "top" }}>
        <span className="text-sm font-medium text-gray-900">
          ${product.price.toFixed(2)}
        </span>
      </td>

      <td className="py-4 px-4 text-center" style={{ verticalAlign: "top" }}>
        <div className="flex items-center justify-center">
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={handleQuantityDecrease}
              className="w-6 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm border-r border-gray-300 transition-colors"
            >
              <Minus className="h-3 w-3" />
            </button>

            <span className="w-8 h-8 flex items-center justify-center text-sm font-medium bg-white">
              {product.quantity}
            </span>

            <button
              onClick={handleQuantityIncrease}
              className="w-6 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 text-sm border-l border-gray-300 transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </td>

      <td className="py-4 px-4 text-center" style={{ verticalAlign: "top" }}>
        <span className="text-sm font-medium text-gray-900">
          ${subtotal.toFixed(2)}
        </span>
      </td>
    </tr>
  );
}
