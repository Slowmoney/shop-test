import {
  Args,
  GqlExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AccessTokenModel } from './accessToken.model';
import { UserInputError } from 'apollo-server-express';
import { GqlAuthGuard } from './gql.guards';
import { CurrentUser } from './currentuser.decorator';

@Resolver('Auth')
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ) {}
  @Mutation((type) => AccessTokenModel)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user);
  }
  @Mutation((type) => AccessTokenModel)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
    @Args('password2') password2: string,
  ) {
    await this.authService.register(username, password, password2);
    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user);
  }
  @UseGuards(GqlAuthGuard)
  @Query((type) => AccessTokenModel)
  async refreshAuthToken(@CurrentUser() _user) {
    const user = await this.userService.findById(_user.id);
    return this.authService.login(user);
  }
}
