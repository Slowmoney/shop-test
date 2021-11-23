import { Args, Query, Resolver } from '@nestjs/graphql';
import ProductModel from './product.model';
import { ProductsService } from './products.service';

@Resolver(() => ProductModel)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}
  @Query((returns) => [ProductModel])
  async allProducts() {
    return await this.productsService.getAll();
  }
  @Query((returns) => [ProductModel])
  async filterProduct(@Args('category') category: string) {
    return await this.productsService.findBySlug(category);
  }
  @Query((returns) => [ProductModel])
  async filterProducts(
    @Args('category', { type: () => [String] }) category: string[],
  ) {
    return await this.productsService.findBySlugs(category);
  }
}
