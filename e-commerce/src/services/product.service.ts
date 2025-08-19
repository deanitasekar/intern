import { apiClient } from "@/lib/axios";
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
} from "@/types/product.type";

export const productService = {
  getProducts: async (
    limit?: number,
    sort?: "asc" | "desc"
  ): Promise<Product[]> => {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (sort) params.append("sort", sort);

    const response = await apiClient.get(`/products?${params.toString()}`);
    console.log(`/products?${params.toString()}`)
    return response.data;
  },

  getProduct: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  getProductsByCategory: async (category: string): Promise<Product[]> => {
    const response = await apiClient.get(`/products/category/${category}`);
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await apiClient.get("/products/categories");
    return response.data;
  },

  createProduct: async (
    productData: CreateProductRequest
  ): Promise<Product> => {
    const response = await apiClient.post(`/products`, productData);
    return response.data;
  },
  updateProduct: async (
    id: number,
    productData: UpdateProductRequest
  ): Promise<Product> => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await apiClient.delete(`/products/${id}`);
  },
};
