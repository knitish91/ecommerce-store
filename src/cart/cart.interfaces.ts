export interface CartItem {
    productId: string;
    quantity: number;
  }
  
  export interface Order {
    id: number;
    items: CartItem[];
    totalAmount: number;
    discountedAmount?: number;
  }