import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CategoryModel from './category.model';
import fs from 'fs';
@Injectable()
export class CategoryService {
  products: { categories: CategoryModel[] };
  constructor(
    @InjectRepository(CategoryModel)
    private categoryRepository: Repository<CategoryModel>,
  ) {
    //@ts-ignore
    this.products = JSON.parse(fs.readFileSync('./products.json'));
  }
  getAll() {
    return this.products.categories; //this.categoryRepository.find();
  }
  findBySlug(slug: string) {
    return this.products.categories.filter((e) => e.slug === slug); //this.categoryRepository.find({ where: { slug } });
  }
  findBySlugs(slug: string[]) {
    return this.products.categories.filter((e) => slug.includes(e.slug));
  }
}
