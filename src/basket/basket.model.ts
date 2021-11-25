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

@ObjectType()
@Entity({ name: 'basket' })
export default class BasketModel {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  
  @Field(() => Int)
  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => UserModel, (u) => u.id)
  @JoinColumn()
  user: UserModel;

  @ManyToMany(() => ProductModel, (p) => p.id, { eager: true })
  @JoinTable()
  @Field(() => [ProductModel], { nullable: true, defaultValue: [] })
  products: ProductModel[];
}
