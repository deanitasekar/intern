"use client";

import { Typography } from "@/components/typography.component";
import Image from "next/image";
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

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    category?: string;
  };
  onClick?: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon
            key={`full-${i}`}
            className="h-4 w-4 text-yellow-500"
            filled={true}
          />
        ))}

        {hasHalfStar && (
          <div className="relative">
            <StarIcon className="h-4 w-4 text-gray-300" filled={false} />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-4 w-4 text-yellow-500" filled={true} />
            </div>
          </div>
        )}

        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon
            key={`empty-${i}`}
            className="h-4 w-4 text-gray-300"
            filled={false}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className="bg-white cursor-pointer h-full flex flex-col transition-all duration-300 ease-in-out transform-gpu hover:scale-110 hover:rotate-3 hover:shadow-lg hover:-translate-y-2"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      onClick={onClick}
    >
      <div
        className="relative bg-gray-100 overflow-hidden p-4"
        style={{ height: "240px" }}
      >
        {product.image ? (
          <>
            <Image
              src={product.image}
              alt={product.name}
              width={400}
              height={400}
              className={`w-full h-full object-contain transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 rounded mx-auto mb-2"></div>
              <Typography variant="small" className="text-gray-500">
                No Image
              </Typography>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <Typography
            variant="h6"
            className="font-semibold text-base mb-3 text-[#212121] transition-colors line-clamp-2"
          >
            {product.name}
          </Typography>

          <div className="flex items-center space-x-2 mb-3">
            {product.originalPrice ? (
              <>
                <Typography
                  variant="small"
                  className="font-semibold text-[15px] text-gray-500 line-through"
                >
                  ${product.originalPrice.toFixed(2)}
                </Typography>
                <Typography
                  variant="h6"
                  className="font-semibold text-[15px] text-[#212121]"
                >
                  ${product.price.toFixed(2)}
                </Typography>
              </>
            ) : (
              <Typography
                variant="h6"
                className="font-semibold text-[15px] text-[#212121]"
              >
                ${product.price.toFixed(2)}
              </Typography>
            )}
          </div>
        </div>

        <div className="flex items-center">
          {renderStars(product.rating)}
          <Typography
            variant="extrasmall"
            className="text-gray-500 ml-2 text-decoration-line: underline"
          >
            {product.reviews} reviews
          </Typography>
        </div>
      </div>
    </div>
  );
}
