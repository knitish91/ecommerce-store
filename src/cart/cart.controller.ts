import { Controller, Post, Body, UseFilters, UseInterceptors } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { CheckoutDto } from './dto/checkout.dto';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { ResponseInterceptor } from '../common/interceptors/response.interceptor';

@Controller('cart')
@UseFilters(HttpExceptionFilter)
@UseInterceptors(ResponseInterceptor)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() addToCartDto: AddToCartDto) {
    this.cartService.addToCart(
      addToCartDto.userId,
      { productId: addToCartDto.productId, quantity: addToCartDto.quantity },
    );
    return { message: 'Item added to cart' , data: {}};
  }

  @Post('checkout')
  checkout(@Body() checkoutDto: CheckoutDto) {
    const order = this.cartService.checkout(checkoutDto.userId, checkoutDto.discountCode);
    return {
      message: 'Order placed',
      data: order,
    };
  }
}