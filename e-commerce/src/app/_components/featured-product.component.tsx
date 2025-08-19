"use client";
import { Button } from "@/components/button.component";
import { Skeleton } from "@/components/skeleton.component";
import { Typography } from "@/components/typography.component";
import { useProducts } from "@/hooks/use-product.hook";
import { ProductCard } from "./product-card.component";

function ProductCardSkeleton() {
  const heights = ["150px", "200px", "180px", "220px", "160px"];
  const randomHeight = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div className="masonry-item">
      <div className="masonry-card">
        <div className="masonry-image">
          <div className="masonry-image-wrapper">
            <Skeleton
              className="w-full rounded-lg"
              style={{ height: randomHeight }}
            />
          </div>
        </div>
        <div className="masonry-content">
          <div className="category-indicator">
            <Skeleton className="category-dot" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorMessage({ error, retry }: { error: any; retry: () => void }) {
  return (
    <div className="text-center py-12">
      <Typography variant="h3" className="text-red-600 mb-4">
        Failed to load products
      </Typography>
      <Typography variant="p" className="text-gray-600 mb-4">
        {error?.message || "Something went wrong while fetching products"}
      </Typography>
      <Button onClick={retry} variant="outline">
        Try Again
      </Button>
    </div>
  );
}

export function FeaturedProducts() {
  const { products, isLoading, error, mutate } = useProducts(8, "desc");

  const splitProductsIntoColumns = (products: any[]) => {
    const leftColumn: any[] = [];
    const rightColumn: any[] = [];

    products.forEach((product, index) => {
      if (index % 2 === 0) {
        leftColumn.push(product);
      } else {
        rightColumn.push(product);
      }
    });

    return { leftColumn, rightColumn };
  };

  const { leftColumn, rightColumn } = products
    ? splitProductsIntoColumns(products)
    : { leftColumn: [], rightColumn: [] };

  return (
    <section className="py-12">
      <div className="container-lg">
        {isLoading && (
          <div className="masonry-container">
            <div className="masonry-column">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={`left-${index}`} />
              ))}
            </div>
            <div className="masonry-column">
              {Array.from({ length: 4 }).map((_, index) => (
                <ProductCardSkeleton key={`right-${index}`} />
              ))}
            </div>
          </div>
        )}

        {error && !isLoading && <ErrorMessage error={error} retry={mutate} />}

        {products &&
          Array.isArray(products) &&
          products.length > 0 &&
          !isLoading && (
            <>
              <div className="masonry-container mb-8">
                <div className="masonry-column">
                  {leftColumn.map((product) => (
                    <div key={product.id} className="masonry-item">
                      <ProductCard
                        product={{
                          id: product.id.toString(),
                          name: product.title,
                          price: product.price,
                          originalPrice:
                            Math.random() > 0.6
                              ? product.price * 1.2
                              : undefined,
                          rating: product.rating?.rate || 4.0,
                          reviews: product.rating?.count || 0,
                          image: product.image,
                          category: product.category,
                        }}
                        columnSide="left"
                      />
                    </div>
                  ))}
                </div>

                <div className="masonry-column">
                  {rightColumn.map((product) => (
                    <div key={product.id} className="masonry-item">
                      <ProductCard
                        product={{
                          id: product.id.toString(),
                          name: product.title,
                          price: product.price,
                          originalPrice:
                            Math.random() > 0.6
                              ? product.price * 1.2
                              : undefined,
                          rating: product.rating?.rate || 4.0,
                          reviews: product.rating?.count || 0,
                          image: product.image,
                          category: product.category,
                        }}
                        columnSide="right"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

        {!isLoading &&
          !error &&
          (!products || !Array.isArray(products) || products.length === 0) && (
            <div className="text-center py-12">
              <Typography variant="h3" className="text-gray-600 mb-4">
                No products found
              </Typography>
              <Typography variant="p" className="text-gray-500 mb-4">
                Check back later for new products
              </Typography>
              <Button onClick={() => mutate()} variant="outline">
                Refresh
              </Button>
            </div>
          )}
      </div>
    </section>
  );
}
