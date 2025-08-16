import useSWR from "swr";
import { productService } from "@/services/product.service";
import { Product } from "@/types/product.type";

export const useProducts = (limit?: number, sort?: "asc" | "desc") => {
  const { data, error, isLoading, mutate } = useSWR(
    ["products", limit, sort],
    async () => {
      try {
        const products = await productService.getProducts(limit, sort);
        console.log("Products fetched:", products);
        return products;
      } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
      }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
      onError: (error) => {
        console.error("SWR Error in useProducts:", error);
      },
      fallbackData: [],
    }
  );

  return {
    products: data as Product[] | undefined,
    isLoading,
    error,
    mutate,
  };
};

export const useProduct = (id: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? ["product", id] : null,
    async () => {
      try {
        return await productService.getProduct(id);
      } catch (err) {
        console.error("Error fetching product:", err);
        throw err;
      }
    },
    {
      revalidateOnFocus: false,
      onError: (error) => {
        console.error("SWR Error in useProduct:", error);
      },
    }
  );

  return {
    product: data as Product | undefined,
    isLoading,
    error,
    mutate,
  };
};

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "categories",
    async () => {
      try {
        return await productService.getCategories();
      } catch (err) {
        console.error("Error fetching categories:", err);
        throw err;
      }
    },
    {
      revalidateOnFocus: false,
      dedupingInterval: 300000,
      onError: (error) => {
        console.error("SWR Error in useCategories:", error);
      },
      fallbackData: [],
    }
  );

  return {
    categories: data as string[] | undefined,
    isLoading,
    error,
    mutate,
  };
};

export const useProductsByCategory = (category: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    category ? ["products", "category", category] : null,
    () => productService.getProductsByCategory(category),
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return {
    products: data as Product[] | undefined,
    isLoading,
    error,
    mutate,
  };
};
