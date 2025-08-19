import { apiClient } from "@/lib/axios";
import {
  Wishlist,
  AddToWishlistRequest,
  WishlistItem,
} from "@/types/product.type";

class WishlistService {
  private static instance: WishlistService;

  private constructor() {}

  static getInstance(): WishlistService {
    if (!WishlistService.instance) {
      WishlistService.instance = new WishlistService();
    }
    return WishlistService.instance;
  }

  async getWishlists(
    limit?: number,
    sort?: `asc` | `desc`
  ): Promise<Wishlist[]> {
    const params = new URLSearchParams();
    if (limit) params.append(`limit`, limit.toString());
    if (sort) params.append(`sort`, sort);

    try {
      const response = await apiClient.get(`/wishlists?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("API wishlists not available, using mock data:", error);
      return [];
    }
  }

  async getWishlist(id: number): Promise<Wishlist> {
    try {
      const response = await apiClient.get(`/wishlists/${id}`);
      return response.data;
    } catch (error) {
      console.error("API wishlist not available, using mock data:", error);
      throw error;
    }
  }

  async getUserWishlists(userId: number): Promise<Wishlist[]> {
    try {
      const response = await apiClient.get("/wishlists");
      const allWishlists = response.data;
      const userWishlists = allWishlists.filter(
        (wishlist: Wishlist) => wishlist.userId === userId
      );

      if (userWishlists.length === 0) {
        return this.getMockWishlistAsArray(userId);
      }

      return userWishlists;
    } catch (error) {
      console.error("Failed to fetch wishlists from API:", error);
      return this.getMockWishlistAsArray(userId);
    }
  }

  async createWishlist(wishlistData: AddToWishlistRequest): Promise<Wishlist> {
    try {
      const response = await apiClient.post(`/wishlists`, wishlistData);

      this.saveMockWishlist(wishlistData.userId, wishlistData.products);

      return response.data;
    } catch (error) {
      console.error("Failed to create wishlist via API:", error);

      const mockWishlist: Wishlist = {
        id: Math.floor(Math.random() * 1000) + 100,
        userId: wishlistData.userId,
        date: wishlistData.date,
        products: wishlistData.products,
      };

      this.saveMockWishlist(wishlistData.userId, wishlistData.products);

      return mockWishlist;
    }
  }

  async updateWishlist(
    id: number,
    wishlistData: Partial<Wishlist>
  ): Promise<Wishlist> {
    try {
      const response = await apiClient.put(`/wishlists/${id}`, wishlistData);

      if (wishlistData.products && wishlistData.userId) {
        this.saveMockWishlist(wishlistData.userId, wishlistData.products);
      }

      return response.data;
    } catch (error) {
      console.error("Failed to update wishlist via API:", error);

      if (wishlistData.products && wishlistData.userId) {
        this.saveMockWishlist(wishlistData.userId, wishlistData.products);
      }

      return {
        id,
        userId: wishlistData.userId || 1,
        date: new Date().toISOString().split("T")[0],
        products: wishlistData.products || [],
      };
    }
  }

  async deleteWishlist(id: number): Promise<void> {
    try {
      await apiClient.delete(`/wishlists/${id}`);
    } catch (error) {
      console.error("Failed to delete wishlist via API:", error);
    }
  }

  async addToWishlist(productId: number, userId: number): Promise<Wishlist> {
    try {
      const userWishlists = await this.getUserWishlists(userId);

      if (userWishlists.length > 0) {
        const existingWishlist = userWishlists[0];
        const existingProducts = existingWishlist.products || [];

        const existingProductIndex = existingProducts.findIndex(
          (item) => item.productId === productId
        );

        if (existingProductIndex >= 0) {
          console.log("Product already in wishlist");
          return existingWishlist;
        }

        const updatedProducts: WishlistItem[] = [
          ...existingProducts,
          { productId },
        ];

        return await this.updateWishlist(existingWishlist.id, {
          products: updatedProducts,
          userId: userId,
        });
      } else {
        const newWishlistData: AddToWishlistRequest = {
          userId,
          date: new Date().toISOString().split("T")[0],
          products: [{ productId }],
        };

        return await this.createWishlist(newWishlistData);
      }
    } catch (error) {
      console.error("Error in addToWishlist:", error);
      throw error;
    }
  }

  async removeWishlistItem(
    wishlistId: number,
    productId: number,
    userId: number
  ): Promise<Wishlist> {
    try {
      const wishlist = await this.getWishlist(wishlistId);
      const updatedProducts = wishlist.products.filter(
        (item) => item.productId !== productId
      );

      return await this.updateWishlist(wishlistId, {
        products: updatedProducts,
        userId: userId,
      });
    } catch (error) {
      console.error("Error removing wishlist item:", error);

      const mockWishlist = this.getMockWishlist(userId);
      if (mockWishlist) {
        const updatedProducts = mockWishlist.products.filter(
          (item) => item.productId !== productId
        );
        this.saveMockWishlist(userId, updatedProducts);

        return {
          id: wishlistId,
          userId,
          date: new Date().toISOString().split("T")[0],
          products: updatedProducts,
        };
      }

      throw error;
    }
  }

  async toggleWishlistItem(
    productId: number,
    userId: number
  ): Promise<{ action: "added" | "removed"; wishlist: Wishlist }> {
    try {
      const userWishlists = await this.getUserWishlists(userId);

      if (userWishlists.length > 0) {
        const existingWishlist = userWishlists[0];
        const existingProducts = existingWishlist.products || [];

        const existingProductIndex = existingProducts.findIndex(
          (item) => item.productId === productId
        );

        if (existingProductIndex >= 0) {
          const updatedProducts = existingProducts.filter(
            (item) => item.productId !== productId
          );
          const updatedWishlist = await this.updateWishlist(
            existingWishlist.id,
            {
              products: updatedProducts,
              userId: userId,
            }
          );
          return { action: "removed", wishlist: updatedWishlist };
        } else {
          const updatedProducts: WishlistItem[] = [
            ...existingProducts,
            { productId },
          ];
          const updatedWishlist = await this.updateWishlist(
            existingWishlist.id,
            {
              products: updatedProducts,
              userId: userId,
            }
          );
          return { action: "added", wishlist: updatedWishlist };
        }
      } else {
        const newWishlistData: AddToWishlistRequest = {
          userId,
          date: new Date().toISOString().split("T")[0],
          products: [{ productId }],
        };

        const newWishlist = await this.createWishlist(newWishlistData);
        return { action: "added", wishlist: newWishlist };
      }
    } catch (error) {
      console.error("Error in toggleWishlistItem:", error);
      throw error;
    }
  }

  private getMockWishlist(userId: number): Wishlist | null {
    try {
      const wishlistData = localStorage.getItem(`wishlist_${userId}`);
      return wishlistData ? JSON.parse(wishlistData) : null;
    } catch {
      return null;
    }
  }

  private getMockWishlistAsArray(userId: number): Wishlist[] {
    const wishlist = this.getMockWishlist(userId);
    return wishlist ? [wishlist] : [];
  }

  private saveMockWishlist(userId: number, products: WishlistItem[]): void {
    const wishlist: Wishlist = {
      id: 999,
      userId,
      date: new Date().toISOString().split("T")[0],
      products,
    };

    localStorage.setItem(`wishlist_${userId}`, JSON.stringify(wishlist));
  }

  clearMockWishlist(userId: number): void {
    localStorage.removeItem(`wishlist_${userId}`);
  }

  isProductInWishlist(productId: number, userId: number): boolean {
    const mockWishlist = this.getMockWishlist(userId);
    if (!mockWishlist) return false;

    return mockWishlist.products.some((item) => item.productId === productId);
  }
}

export const wishlistService = WishlistService.getInstance();
