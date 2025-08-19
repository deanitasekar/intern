import { apiClient } from "@/lib/axios";
import { Cart, AddToCartRequest, CartItem } from "@/types/product.type";

class CartService {
  private static instance: CartService;

  private constructor() {}

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  async getCarts(limit?: number, sort?: `asc` | `desc`): Promise<Cart[]> {
    const params = new URLSearchParams();
    if (limit) params.append(`limit`, limit.toString());
    if (sort) params.append(`sort`, sort);

    const response = await apiClient.get(`/carts?${params.toString()}`);
    return response.data;
  }

  async getCart(id: number): Promise<Cart> {
    const response = await apiClient.get(`/carts/${id}`);
    return response.data;
  }

  async getUserCarts(userId: number): Promise<Cart[]> {
    try {
      const response = await apiClient.get('/carts');
      const allCarts = response.data;
      const userCarts = allCarts.filter((cart: Cart) => cart.userId === userId);
      
      if (userCarts.length === 0) {
        return this.getMockCartAsArray(userId);
      }
      
      return userCarts;
    } catch (error) {
      console.error('Failed to fetch carts from API:', error);
      return this.getMockCartAsArray(userId);
    }
  }

  async createCart(cartData: AddToCartRequest): Promise<Cart> {
    try {
      const response = await apiClient.post(`/carts`, cartData);

      this.saveMockCart(cartData.userId, cartData.products);
      
      return response.data;
    } catch (error) {
      console.error('Failed to create cart via API:', error);
      
      const mockCart: Cart = {
        id: Math.floor(Math.random() * 1000) + 100,
        userId: cartData.userId,
        date: cartData.date,
        products: cartData.products
      };
      
      this.saveMockCart(cartData.userId, cartData.products);
      
      return mockCart;
    }
  }

  async updateCart(id: number, cartData: Partial<Cart>): Promise<Cart> {
    try {
      const response = await apiClient.put(`/carts/${id}`, cartData);
      
      if (cartData.products && cartData.userId) {
        this.saveMockCart(cartData.userId, cartData.products);
      }
      
      return response.data;
    } catch (error) {
      console.error('Failed to update cart via API:', error);
      
      if (cartData.products && cartData.userId) {
        this.saveMockCart(cartData.userId, cartData.products);
      }
      
      return {
        id,
        userId: cartData.userId || 1,
        date: new Date().toISOString().split('T')[0],
        products: cartData.products || []
      };
    }
  }

  async deleteCart(id: number): Promise<void> {
    try {
      await apiClient.delete(`/carts/${id}`);
    } catch (error) {
      console.error('Failed to delete cart via API:', error);
    }
  }

  async addToCart(productId: number, quantity: number, userId: number): Promise<Cart> {
    try {
      const userCarts = await this.getUserCarts(userId);
      
      if (userCarts.length > 0) {
        const existingCart = userCarts[0];
        const existingProducts = existingCart.products || [];
        
        const existingProductIndex = existingProducts.findIndex(
          item => item.productId === productId
        );
        
        let updatedProducts: CartItem[];
        if (existingProductIndex >= 0) {
          updatedProducts = existingProducts.map((item, index) => 
            index === existingProductIndex 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updatedProducts = [...existingProducts, { productId, quantity }];
        }
        
        return await this.updateCart(existingCart.id, {
          products: updatedProducts,
          userId: userId
        });
      } else {
        const newCartData: AddToCartRequest = {
          userId,
          date: new Date().toISOString().split('T')[0],
          products: [{ productId, quantity }]
        };
        
        return await this.createCart(newCartData);
      }
    } catch (error) {
      console.error('Error in addToCart:', error);
      throw error;
    }
  }

  async updateCartItemQuantity(cartId: number, productId: number, newQuantity: number, userId: number): Promise<Cart> {
    try {
      const cart = await this.getCart(cartId);
      const updatedProducts = cart.products.map(item => 
        item.productId === productId 
          ? { ...item, quantity: newQuantity }
          : item
      );
      
      return await this.updateCart(cartId, {
        products: updatedProducts,
        userId: userId
      });
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      
      const mockCart = this.getMockCart(userId);
      if (mockCart) {
        const updatedProducts = mockCart.products.map(item => 
          item.productId === productId 
            ? { ...item, quantity: newQuantity }
            : item
        );
        this.saveMockCart(userId, updatedProducts);
        
        return {
          id: cartId,
          userId,
          date: new Date().toISOString().split('T')[0],
          products: updatedProducts
        };
      }
      
      throw error;
    }
  }

  async removeCartItem(cartId: number, productId: number, userId: number): Promise<Cart> {
    try {
      const cart = await this.getCart(cartId);
      const updatedProducts = cart.products.filter(item => item.productId !== productId);
      
      return await this.updateCart(cartId, {
        products: updatedProducts,
        userId: userId
      });
    } catch (error) {
      console.error('Error removing cart item:', error);
      
      const mockCart = this.getMockCart(userId);
      if (mockCart) {
        const updatedProducts = mockCart.products.filter(item => item.productId !== productId);
        this.saveMockCart(userId, updatedProducts);
        
        return {
          id: cartId,
          userId,
          date: new Date().toISOString().split('T')[0],
          products: updatedProducts
        };
      }
      
      throw error;
    }
  }

  private getMockCart(userId: number): Cart | null {
    try {
      const cartData = localStorage.getItem(`cart_${userId}`);
      return cartData ? JSON.parse(cartData) : null;
    } catch {
      return null;
    }
  }

  private getMockCartAsArray(userId: number): Cart[] {
    const cart = this.getMockCart(userId);
    return cart ? [cart] : [];
  }

  private saveMockCart(userId: number, products: CartItem[]): void {
    const cart: Cart = {
      id: 999,
      userId,
      date: new Date().toISOString().split('T')[0],
      products
    };
    
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }

  clearMockCart(userId: number): void {
    localStorage.removeItem(`cart_${userId}`);
  }
}

export const cartService = CartService.getInstance();