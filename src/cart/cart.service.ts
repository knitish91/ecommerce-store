import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CartItem, Order } from './cart.interfaces';

@Injectable()
export class CartService {
  private cart: Record<string, CartItem[]> = {};
  private orders: Order[] = [];
  private discountCodes: string[] = [];
  private nthOrder = 5;

  addToCart(userId: string, item: CartItem) {
    if (item.quantity <= 0) throw new BadRequestException('Quantity must be greater than 0');

    this.cart[userId] = this.cart[userId] || [];
    this.cart[userId].push(item);
  }

  checkout(userId: string, discountCode?: string): Order {
    const items = this.cart[userId];
    if (!items || !items.length) throw new NotFoundException('Cart is empty');

    let totalAmount = items.reduce((sum, item) => sum + item.quantity * 10, 0);
    let discountedAmount = totalAmount;

    if (discountCode && this.validateDiscountCode(discountCode)) {
      discountedAmount *= 0.9;
    }

    const order = { id: Date.now(), items, totalAmount, discountedAmount };
    this.orders.push(order);
    delete this.cart[userId];

    if (this.orders.length % this.nthOrder === 0) {
      this.generateDiscountCode();
    }

    return order;
  }

  generateDiscountCode() {
    const code = `DISCOUNT${this.orders.length + 1}`;
    this.discountCodes.push(code);
  }

  private validateDiscountCode(code: string): boolean {
    const index = this.discountCodes.indexOf(code);
    if (index > -1) {
      this.discountCodes.splice(index, 1);
      return true;
    }
    return false;
  }

  getPurchaseSummary() {
    const totalPurchaseAmount = this.orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalDiscountAmount = this.orders.reduce((sum, order) => sum + (order.totalAmount - order.discountedAmount), 0);

    return {
      itemCount: this.orders.reduce((count, order) => count + order.items.length, 0),
      totalPurchaseAmount,
      discountCodes: this.discountCodes,
      totalDiscountAmount,
    };
  }
}