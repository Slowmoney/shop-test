import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import UserModel from '../users/user.model';
import { UsersService } from '../users/users.service';
import BasketModel from './basket.model';
import BasketItemModel from './basketItem.model';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketModel)
    private basketRepository: Repository<BasketModel>,
    @InjectRepository(BasketItemModel)
    private basketItemRepository: Repository<BasketItemModel>,
    private userService: UsersService,
    private productService: ProductsService,
  ) {}
  async findByUserIdOrCreate(userId: number) {
    const user = await this.userService.findById(userId);
    let basket = await this.basketRepository.findOne({
      where: { user: user.id },
      relations: ['items'],
    });
    if (!basket) {
      basket = new BasketModel();
      basket.user = user;
      basket.items = [];
      await this.basketRepository.save(basket);
    }
    return basket;
  }
  async addProduct(basket: BasketModel, productId: number) {
    const product = await this.productService.findById(productId);
    if (!product)
      throw new NotFoundException(`Not Found Product By id: ${productId}`);
    let basketItem = basket.items.find((e) => e.product.id == product.id);
    if (basketItem) {
      basketItem.count += 1;
      await this.basketItemRepository.save(basketItem);
    } else {
      basketItem = new BasketItemModel();
      basketItem.product = product;
      basketItem.basket = basket;
      basketItem = await this.basketItemRepository.save(basketItem);
      basket.items.push(basketItem);
    }
    console.log(basket);
    return basket;
  }
}
