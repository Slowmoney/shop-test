import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ProductsModule } from '../products/products.module';
import BasketModel from './basket.model';
import { BasketResolver } from './basket.resolver';
import { BasketService } from './basket.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BasketModel]),
    AuthModule,
    ProductsModule,
  ],
  providers: [BasketResolver, BasketService],
})
export class BasketModule {}
