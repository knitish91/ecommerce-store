// src/cart/cart.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { CartItem } from './cart.interfaces';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartService],
    }).compile();

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add items to the cart', () => {
    const userId = 'user1';
    const item: CartItem = { productId: 'prod1', quantity: 2 };
    service.addToCart(userId, item);
    expect(service['cart'][userId]).toEqual([item]);
  });

  it('should checkout and clear the cart', () => {
    const userId = 'user1';
    const item: CartItem = { productId: 'prod1', quantity: 2 };
    service.addToCart(userId, item);
    const order = service.checkout(userId);
    expect(order.items).toEqual([item]);
    expect(service['cart'][userId]).toBeUndefined();
  });

  it('should generate a discount code every nth order', () => {
    const item: CartItem = { productId: 'prod1', quantity: 1 };
    for (let i = 0; i < 5; i++) {
      const userId = `user${i}`;
      service.addToCart(userId, item);
      service.checkout(userId);
    }
    expect(service['discountCodes'].length).toBe(1);
  });

  it('should validate and apply discount code', () => {
    service['discountCodes'].push('DISCOUNT1');
    const userId = 'user1';
    const item: CartItem = { productId: 'prod1', quantity: 10 };
    service.addToCart(userId, item);
    const order = service.checkout(userId, 'DISCOUNT1');
    expect(order.discountedAmount).toBe(90); // 10 items * 10 each = 100, with 10% discount = 90
  });

  it('should not apply an invalid discount code', () => {
    const userId = 'user1';
    const item: CartItem = { productId: 'prod1', quantity: 10 };
    service.addToCart(userId, item);
    const order = service.checkout(userId, 'INVALID_CODE');
    expect(order.discountedAmount).toBe(100); // No discount applied
  });
});