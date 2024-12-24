import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { CartService } from '../cart/cart.service';

@Module({
  controllers: [AdminController],
  providers: [CartService],
})
export class AdminModule {}