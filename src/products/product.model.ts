import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import CategoryModel from '../category/category.model';
@ObjectType()
@Entity({ name: 'product' })
export default class ProductModel {
  @Field(() => Int)
  @PrimaryColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  slug: string;

  @Field()
  @Column()
  category_id: number;

  @ManyToOne((type) => CategoryModel, (c) => c.id, { eager: true })
  @JoinColumn({ name: 'category_id' })
  @Field((type) => CategoryModel)
  category: CategoryModel;

  @Field()
  @Column()
  price: number;
}
