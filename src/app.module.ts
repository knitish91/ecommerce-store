import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CartModule } from './cart/cart.module';
import { AdminModule } from './admin/admin.service';

@Module({
  imports: [CartModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
