import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import BasketModel from './basket.model';
import { BasketService } from './basket.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.guards';
import { CurrentUser } from '../auth/currentuser.decorator';

@Resolver(() => BasketModel)
export class BasketResolver {
  constructor(private basketService: BasketService) {}

  @UseGuards(GqlAuthGuard)
  @Query((returns) => BasketModel)
  getBasket(@CurrentUser() user) {
    return this.basketService.findByUserIdOrCreate(user.id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation((returns) => BasketModel)
  async addProductToBasket(
    @CurrentUser() user,
    @Args('productId') productId: number,
  ) {
    const basket = await this.basketService.findByUserIdOrCreate(user.id);
    return await this.basketService.addProduct(basket, productId);
  }
}
