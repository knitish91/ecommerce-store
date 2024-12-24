import { CartItem } from "./cart-item.model";

export interface Order {
    id: number;
    items: CartItem[];
    totalAmount: number;
    discountCode?: string;
    discountedAmount?: number;
  }
  