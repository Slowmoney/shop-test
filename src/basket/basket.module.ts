import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';
import BasketModel from './basket.model';
import { BasketResolver } from './basket.resolver';
import { BasketService } from './basket.service';
import BasketItemModel from './basketItem.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketModel, BasketItemModel]),
    AuthModule,
    ProductsModule,
    UsersModule,
  ],
  providers: [BasketResolver, BasketService],
})
export class BasketModule {}
