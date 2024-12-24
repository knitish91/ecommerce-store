import { Controller, Post, Get } from '@nestjs/common';
import { CartService } from '../cart/cart.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly cartService: CartService) {}

  // Generates a discount code
  @Post('generate-discount')
  generateDiscount() {
    this.cartService.generateDiscountCode();
    return {
      message: 'Discount code generated successfully',
      data: {}, // You could return the new code if needed
    };
  }

  // Retrieves the purchase summary
  @Get('purchase-summary')
  getPurchaseSummary() {
    const summary = this.cartService.getPurchaseSummary();
    return {
      message: 'Purchase summary retrieved successfully',
      data: summary,
    };
  }
}