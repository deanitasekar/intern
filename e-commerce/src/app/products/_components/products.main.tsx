"use client";

import { useAuthGuard } from "@/components/auth-middleware.component";
import { Button } from "@/components/button.component";
import { Typography } from "@/components/typography.component";
import { Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { ProductHeader } from "./product-header.component";
import { ProductCard } from "./products-card.component";
import { Sidebar } from "./sidebar.component";
import { Toolbar } from "./toolbar.component";
import { useProductsForm } from "../_hooks/products.hook";

export default function ProductsMain() {
  const { isAllowed, isLoading: authLoading } = useAuthGuard();

  const {
    filteredProducts,
    categories,
    isLoading: productsLoading,
    error,
    selectedCategory,
    sortBy,
    viewMode,
    totalItems,
    hasActiveFilters,
    handleCategoryChange,
    handleSortChange,
    handleViewModeChange,
    clearAllFilters,
  } = useProductsForm();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-[#7DB800]" />
          <p className="text-gray-600">Checking access permissions</p>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return null;
  }

  if (productsLoading) {
    return (
      <div className="min-h-screen">
        <ProductHeader title="Product Catalog" />
        <div className="container-lg mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7DB800] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading products</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <ProductHeader title="Product Catalog" />
        <div className="container-lg mx-auto px-6 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center bg-white p-8 rounded-lg shadow-sm border">
              <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl text-red-600 mb-4">
                Failed to load products
              </h3>
              <p className="text-gray-600 mb-6">{error.message}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen m-0 p-0">
      <ProductHeader title="Product Catalog" />

      <div className="container-lg mx-auto px-6 py-8">
        <div className="flex gap-8">
          <aside className="flex-shrink-0 hidden lg:block">
            <Sidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </aside>

          <main className="flex-1">
            <Toolbar
              itemCount={totalItems}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
              sortBy={sortBy}
              onSortChange={handleSortChange}
            />

            <div className="bg-white px-4 py-2">
              {filteredProducts && filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
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
                            Math.random() > 0.7
                              ? product.price * 1.3
                              : undefined,
                          rating: product.rating?.rate || 4.0,
                          reviews: product.rating?.count || 0,
                          image: product.image,
                          category: product.category,
                        }}
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl text-gray-600 mb-4">
                    No products found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {hasActiveFilters
                      ? "Try adjusting your filters or search criteria"
                      : "No products available at the moment"}
                  </p>
                  {hasActiveFilters && (
                    <Button
                      onClick={clearAllFilters}
                      className="bg-[#7DB800] hover:bg-[#6BA700] text-white"
                    >
                      Clear All Filters
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-end bg-white p-4">
              <div className="flex items-center text-gray-600 text-sm space-x-2">
                <Typography
                  variant="small"
                  className="text-gray-600 whitespace-nowrap"
                >
                  Show
                </Typography>
                <select className="bg-gray-200 border border-gray-200 px-3 py-1 text-sm text-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300">
                  <option>20</option>
                  <option>40</option>
                  <option>60</option>
                </select>
                <Typography
                  variant="small"
                  className="text-gray-600 whitespace-nowrap"
                >
                  per page
                </Typography>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
