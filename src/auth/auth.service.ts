import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserModel from '../users/user.model';
import { UsersService } from '../users/users.service';
import { AccessTokenModel } from './accessToken.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<UserModel>> {
    const user = await this.usersService.findByUserName(username);
    if (user && user.comparePassword(pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: Partial<UserModel>) {
    const payload = { id: user.id };
    return new AccessTokenModel(this.jwtService.sign(payload));
  }
  async register(username: string, password: string, password2: string) {
    const user = await this.usersService.findByUserName(username);
    if (user) throw new NotFoundException('user with user was created');
    if (password !== password2)
      throw new NotFoundException('Password not compare');
    const newUser = await this.usersService.create(username, password);
    return newUser;
  }
}
