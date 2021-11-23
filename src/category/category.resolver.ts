import { Resolver, Query, Args } from '@nestjs/graphql';
import CategoryModel from './category.model';
import { CategoryService } from './category.service';

@Resolver(() => CategoryModel)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}
  @Query((returns) => [CategoryModel])
  async allCategories() {
    return await this.categoryService.getAll();
  }
  @Query((returns) => [CategoryModel])
  async filterCategory(@Args('category') category: string) {
    return await this.categoryService.findBySlug(category);
  }
  @Query((returns) => [CategoryModel])
  async filterCategories(
    @Args('category', { type: () => [String] }) category: string[],
  ) {
    return await this.categoryService.findBySlugs(category);
  }
}
