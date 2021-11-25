import {
  Args,
  GqlExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import BasketModel from './basket.model';
import { BasketService } from './basket.service';
import { ExecutionContext, Req, UseGuards } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql.guards';
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
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
