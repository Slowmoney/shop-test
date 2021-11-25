import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import CategoryModel from './product.model';
import fs from 'fs';
import ProductModel from './product.model';
@Injectable()
export class ProductsService {
  products: { products: ProductModel[] };
  constructor(
    @InjectRepository(ProductModel)
    private productsRepository: Repository<ProductModel>,
  ) {
/*     this.products = JSON.parse(
      fs.readFileSync('./products.json') as unknown as string,
    );
    this.products.products.forEach(async (e) => {
      if (!(await this.productsRepository.findOne({ where: { id: e.id } }))) {
        const categoryModel = new ProductModel();
        categoryModel.id = e.id;
        categoryModel.name = e.name;
        categoryModel.slug = e.slug;
        categoryModel.category_id = e.category_id;
        categoryModel.price = e.price;
        this.productsRepository.save(categoryModel);
      }
    }); */
  }
  getAll() {
    return this.productsRepository.find({ relations: ['category'] });
  }
  findBySlug(slug: string) {
    return this.productsRepository.find({
      where: { slug },
      relations: ['category'],
    });
  }
  findBySlugs(slug: string[]) {
    return this.productsRepository.find({
      where: { slug: In(slug) },
      relations: ['category'],
    });
  }
  findById(id: number) {
    return this.productsRepository.findOne({ where: { id } });
  }
}
