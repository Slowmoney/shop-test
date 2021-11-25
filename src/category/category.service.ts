import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import CategoryModel from './category.model';
import fs from 'fs';
@Injectable()
export class CategoryService {
  products: { categories: CategoryModel[] };
  constructor(
    @InjectRepository(CategoryModel)
    private categoryRepository: Repository<CategoryModel>,
  ) {
    /* this.products = JSON.parse(
      fs.readFileSync('./products.json') as unknown as string,
    );
    this.products.categories.forEach(async (e) => {
      if (!(await this.categoryRepository.findOne({ where: { id: e.id } }))) {
        const categoryModel = new CategoryModel();
        categoryModel.id = e.id;
        categoryModel.name = e.name;
        categoryModel.slug = e.slug;
        this.categoryRepository.save(categoryModel);
      }
    }); */
  }
  getAll() {
    return this.categoryRepository.find();
  }
  findBySlug(slug: string) {
    return this.categoryRepository.find({ where: { slug } });
  }
  findBySlugs(slug: string[]) {
    return this.categoryRepository.find({ where: { slug: In(slug) } });
  }
}
