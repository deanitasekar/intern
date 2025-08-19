"use client";

import { Navbar } from "@/components/navbar.component";
import { useProduct } from "@/hooks/use-product.hook";
import { useParams, useRouter } from "next/navigation";
import { ProductIdDetail } from "./detail.component";
import { ProductIdInfo } from "./info.component";
import { RelatedProducts } from "./related-products.compoennt";

export default function ProductsIdMain() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  const { product, isLoading, error } = useProduct(Number(id));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7DB800] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h3 className="text-xl text-red-600 mb-4">Product not found</h3>
            <p className="text-gray-600 mb-6">
              The product you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <button
              onClick={() => router.back()}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <ProductIdInfo product={product} />

      <div className="container-lg mx-auto px-6 py-12">
        <ProductIdDetail />
      </div>

      {product && (
        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      )}
    </div>
  );
}
