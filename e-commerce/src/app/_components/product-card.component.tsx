"use client";

import { Typography } from "@/components/typography.component";
import { Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
    badge?: string;
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

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (onClick) {
      return (
        <div onClick={onClick} className="cursor-pointer">
          {children}
        </div>
      );
    }
    return (
      <Link href={`/products/${product.id}`} className="block">
        {children}
      </Link>
    );
  };

  return (
    <CardWrapper>
      <div 
        className="masonry-card transition-all duration-300 ease-in-out transform-gpu hover:scale-105 hover:rotate-1 hover:shadow-lg hover:-translate-y-1"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        <div className="masonry-image">
          <div className="masonry-image-wrapper">
            {product.image && !imageError ? (
              <img
                src={product.image}
                alt={product.name}
                className="masonry-image-content"
                onError={handleImageError}
                onLoad={handleImageLoad}
                style={{
                  display: imageLoaded ? "block" : "none",
                }}
              />
            ) : null}

            {(imageError || !product.image) && (
              <div className="masonry-image-placeholder">
                <ShoppingCart className="h-12 w-12 text-gray-400 mb-2" />
                <Typography
                  variant="small"
                  className="text-gray-500 text-center max-w-[200px]"
                >
                  {product.name}
                </Typography>
              </div>
            )}

            {!imageLoaded && !imageError && product.image && (
              <div className="masonry-image-placeholder">
                <div className="animate-pulse">
                  <div className="h-32 w-32 bg-gray-300 rounded"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="masonry-content">
          {product.category && (
            <div className="category-indicator flex items-center space-x-1">
              
              <div className="w-4 h-4 rounded-full bg-lime-50 flex items-center justify-center border border-lime-100">
                <Plus className="h-3 w-3" style={{ color: "#7DB800" }} />
              </div>

              <span className="category-text text-gray-700 text-lg font-medium">
                {product.category}
              </span>
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}