"use client";

import { ProductCard } from "@/app/products/_components/products-card.component";
import { Button } from "@/components/button.component";
import { Typography } from "@/components/typography.component";
import { useAuth } from "@/hooks/use-auth.hook";
import { useCart } from "@/hooks/use-cart.hook";
import { useWishlist } from "@/hooks/use-wishlist";
import { Heart, LogIn, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { WishlistHeader } from "./wishlist-header.component";

export default function WishlistMain() {
  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
    getTotalItems,
    isLoading: wishlistLoading,
  } = useWishlist();
  const { addToCart, isLoading: cartLoading } = useCart();
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const customBreadcrumbs = [{ label: "Wishlist", current: true }];

  const handleProductClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  const handleAddToCart = async (product: any) => {
    if (!isAuthenticated || !user) {
      router.push("/auth");
      return;
    }

    setAddingToCart(product.id);
    try {
      await addToCart(product, 1);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };

  const handleLoginRedirect = () => {
    router.push("/auth");
  };

  const transformedProducts = wishlist.map((product) => ({
    id: product.id.toString(),
    name: product.title,
    price: product.price,
    rating: product.rating?.rate || 0,
    reviews: product.rating?.count || 0,
    image: product.image,
    category: product.category,
  }));

  if (wishlistLoading) {
    return (
      <>
        <WishlistHeader
          title="Wishlist"
          customBreadcrumbs={customBreadcrumbs}
        />
        <div className="bg-gray-50 min-h-screen">
          <div className="container-lg mx-auto px-6 py-8">
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E91E63]"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <WishlistHeader title="Wishlist" customBreadcrumbs={customBreadcrumbs} />

      <div>
        <div className="container-lg mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <Typography className="text-gray-600">
                {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"}{" "}
                saved for later
              </Typography>
            </div>
          </div>

          {!isAuthenticated && wishlist.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <LogIn className="h-5 w-5 text-blue-600 mr-3" />
                <div>
                  <Typography className="text-blue-800">
                    Please{" "}
                    <button
                      onClick={handleLoginRedirect}
                      className="underline font-medium hover:text-blue-900"
                    >
                      login
                    </button>{" "}
                    to add items to your cart
                  </Typography>
                </div>
              </div>
            </div>
          )}

          {wishlist.length === 0 ? (
            <div className="text-center py-20">
              <div className="mb-6">
                <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <Typography
                  variant="h3"
                  className="text-2xl font-semibold text-gray-900 mb-2"
                >
                  Your wishlist is empty
                </Typography>
                <Typography className="text-gray-600 max-w-md mx-auto">
                  Save items you love for later
                </Typography>
              </div>
              <Button
                onClick={() => router.push("/products")}
                className="bg-[#7DB800] hover:bg-lime-600 text-white px-8 py-3"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {transformedProducts.map((product) => {
                const originalProduct = wishlist.find(
                  (p) => p.id.toString() === product.id
                );
                return (
                  <div key={product.id} className="relative group">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(parseInt(product.id));
                      }}
                      className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4 text-red-500 hover:text-red-600" />
                    </button>

                    <div className="h-full">
                      <ProductCard
                        product={product}
                        onClick={() => handleProductClick(parseInt(product.id))}
                      />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                      {isAuthenticated ? (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (originalProduct) {
                              handleAddToCart(originalProduct);
                            }
                          }}
                          disabled={
                            addingToCart === parseInt(product.id) || cartLoading
                          }
                          className="w-full bg-[#7DB800] hover:bg-[#6FA500] text-white py-2 text-sm flex items-center justify-center gap-2"
                        >
                          {addingToCart === parseInt(product.id) ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              Adding...
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-4 w-4" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLoginRedirect();
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-sm flex items-center justify-center gap-2"
                        >
                          <LogIn className="h-4 w-4" />
                          Login to Add
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {wishlist.length > 0 && (
            <div className="text-center mt-12">
              <Button
                onClick={() => router.push("/products")}
                className="bg-[#7DB800] hover:bg-lime-600 text-white px-8 py-3"
              >
                Continue Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
