"use client";

import { Typography } from "@/components/typography.component";
import { useProductsByCategory } from "@/hooks/use-product.hook";
import { productService } from "@/services/product.service";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProductCard } from "../../_components/products-card.component";

interface RelatedProductsProps {
  category: string;
  currentProductId: number;
}

export function RelatedProducts({
  category,
  currentProductId,
}: RelatedProductsProps) {
  const { products: categoryProducts, isLoading: categoryLoading } =
    useProductsByCategory(category);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!categoryProducts || categoryLoading) return;

    const fetchRelatedProducts = async () => {
      try {
        const filteredIds = categoryProducts
          .filter((p) => p.id !== currentProductId)
          .slice(0, 4)
          .map((p) => p.id);

        const productPromises = filteredIds.map((id) =>
          productService.getProduct(id)
        );

        const fetchedProducts = await Promise.all(productPromises);
        setRelatedProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [categoryProducts, categoryLoading, currentProductId]);

  if (isLoading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container-lg mx-auto px-6">
          <div className="text-center mb-8">
            <Typography
              variant="h3"
              className="text-2xl font-normal text-gray-800"
            >
              Related Products
            </Typography>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-4 animate-pulse"
              >
                <div className="bg-gray-200 h-48 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                  <div className="bg-gray-200 h-4 rounded w-1/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!relatedProducts?.length) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container-lg mx-auto px-6">
        <div className="text-center mb-8">
          <Typography
            variant="h3"
            className="text-2xl font-normal text-gray-800"
          >
            Related Products
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="block"
            >
              <ProductCard
                product={{
                  id: product.id.toString(),
                  name: product.title,
                  price: product.price,
                  originalPrice:
                    Math.random() > 0.7 ? product.price * 1.3 : undefined,
                  rating: product.rating?.rate || 4.0,
                  reviews: product.rating?.count || 0,
                  image: product.image,
                  category: product.category,
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
