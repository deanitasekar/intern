export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
  products_update?: Product[];
}

export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface AddToCartRequest {
  userId: number;
  date: string;
  products: CartItem[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {}
