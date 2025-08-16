"use client";

import { Breadcrumb } from "@/components/breadcrumb.component";
import { Button } from "@/components/button.component";
import { useAuth } from "@/hooks/use-auth.hook";
import { useCart } from "@/hooks/use-cart.hook";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Heart,
  LogIn,
  Mail,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const StarIcon = ({
  className = "h-4 w-4",
  filled = false,
}: {
  className?: string;
  filled?: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={filled ? "0" : "1"}
      d="m5.825 21l1.625-7.025L2 9.25l7.2-.625L12 2l2.8 6.625l7.2.625l-5.45 4.725L18.175 21L12 17.275z"
    />
  </svg>
);

interface ProductIdInfoProps {
  product: {
    id: number;
    title: string;
    price: number;
    rating?: {
      rate: number;
      count: number;
    };
    category: string;
    image: string;
    description: string;
  };
}

export function ProductIdInfo({ product }: ProductIdInfoProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const {
    addToCart,
    isLoading: isAddingToCart,
    isInCart,
    getCartItem,
  } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const images = Array(4).fill(product.image);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${
              i < Math.floor(rating) ? "text-orange-400" : "text-gray-300"
            }`}
            filled={i < Math.floor(rating)}
          />
        ))}
      </div>
    );
  };

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated || !user) {
      router.push("/auth");
      return;
    }

    try {
      addToCart(product, quantity);

      setQuantity(1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/auth");
  };

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: product.title },
  ];

  return (
    <div className="bg-white">
      <div className="container-lg mx-auto px-6 py-8 md:mt-2">
        <div className="py-6">
          <Breadcrumb
            items={breadcrumbItems}
            separator=" > "
            className="text-sm"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-4">
            <div
              className="relative bg-gray-100 overflow-hidden"
              style={{ height: "500px" }}
            >
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-colors"
              >
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>

              <div className="w-full h-full p-8 flex items-center justify-center">
                {!imageError ? (
                  <img
                    src={images[currentImageIndex]}
                    alt={product.title}
                    className="max-w-full max-h-full object-contain"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="w-32 h-32 bg-gray-300 rounded mx-auto mb-4"></div>
                    <p>Image not available</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative bg-gray-100 overflow-hidden border-2 transition-colors ${
                    currentImageIndex === index
                      ? "border-gray-300"
                      : "border-gray-100 hover:border-gray-200"
                  }`}
                  style={{ width: "90px", height: "90px" }}
                >
                  <div className="w-full h-full p-2 flex items-center justify-center">
                    <img
                      src={img}
                      alt={`${product.title} view ${index + 1}`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-[40px] font-normal text-gray-800 mb-4 leading-tight">
                {product.title}
              </h1>

              <div className="flex items-center space-x-3 mb-4">
                {product.rating && renderStars(product.rating.rate)}
                <span className="text-xs text-gray-600 hover:underline">
                  {product.rating?.count || 0} reviews
                </span>
                <button className="text-xs text-gray-800 ml-3 hover:underline">
                  Add Your Review
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between border-b pb-6">
                  <div>
                    <p className="text-base text-gray-600 mb-1">As low as</p>
                    <p className="text-4xl font-medium text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <div className="flex items-center text-[#7DB800] mb-1">
                      <div className="w-2 h-2 bg-[#7DB800] rounded-full mr-2"></div>
                      <span className="text-sm font-bold text-gray-600">
                        IN STOCK
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      SKU#: {product.id}-MB05
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {!isAuthenticated && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex items-center">
                  <LogIn className="h-5 w-5 text-blue-600 mr-2" />
                  <p className="text-sm text-blue-800">
                    Please{" "}
                    <button
                      onClick={handleLoginRedirect}
                      className="underline font-medium"
                    >
                      login
                    </button>{" "}
                    to add items to your cart
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {isAuthenticated ? (
                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="w-full bg-[#7DB800] hover:bg-[#6FA500] disabled:bg-gray-400 text-white py-3 text-base font-medium rounded flex items-center justify-center"
                >
                  {isAddingToCart ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding to Cart...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleLoginRedirect}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-base font-medium rounded flex items-center justify-center"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login to Add to Cart
                </Button>
              )}

              <div className="flex items-center space-x-6 pt-2">
                <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                  <Heart className="h-5 w-5 mr-2" />
                  <span className="text-sm">ADD TO WISH LIST</span>
                </button>

                <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  <span className="text-sm">ADD TO COMPARE</span>
                </button>

                <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                  <Mail className="h-5 w-5 mr-2" />
                  <span className="text-sm">EMAIL</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
