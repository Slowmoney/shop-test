import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import ProductModel from '../products/product.model';
import UserModel from '../users/user.model';
import BasketItemModel from './basketItem.model';

@ObjectType()
@Entity({ name: 'basket' })
export default class BasketModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserModel, (u) => u.id)
  @JoinColumn()
  user: UserModel;

  @Field(() => [BasketItemModel], { defaultValue: [] })
  @OneToMany(() => BasketItemModel, (p) => p.basket, { eager: true })
  @JoinColumn()
  items: BasketItemModel[];
}
