import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import BasketModel from './basket.model';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketModel)
    private basketRepository: Repository<BasketModel>,
    private productService: ProductsService,
  ) {}
  async findByUserIdOrCreate(userId: number) {
    let basket = await this.basketRepository.findOne({
      where: { userId },
      relations: ['products'],
    });
    if (!basket) {
      basket = new BasketModel();
      basket.userId = userId;
      await this.basketRepository.save(basket);
    }
    return basket;
  }
  async addProduct(basket: BasketModel, productId: number) {
    const product = await this.productService.findById(productId);
    if (!product)
      throw new NotFoundException(`Not Found Product By id: ${productId}`);
    console.log(product);
    console.log(basket);
    if (!basket.products) basket.products = [product];
    else basket.products.push(product);
    console.log(await this.basketRepository.save(basket));
    return await this.basketRepository.save(basket);
  }
}
