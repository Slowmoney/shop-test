import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ProductModel from '../products/product.model';
import UserModel from '../users/user.model';
import BasketModel from './basket.model';

@ObjectType()
@Entity({ name: 'basket-item' })
export default class BasketItemModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => BasketModel)
  @ManyToOne(() => BasketModel, (b) => b.id)
  basket: BasketModel;

  @ManyToOne(() => ProductModel, (p) => p.id, { eager: true })
  @JoinColumn()
  @Field(() => ProductModel)
  product: ProductModel;

  @Field(() => Int)
  @Column({ default: 1 })
  count: number;
}
