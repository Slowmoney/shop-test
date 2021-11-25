import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenModel {
  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
  @Field()
  accessToken: string;
}
