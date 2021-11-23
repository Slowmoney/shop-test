import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserModel from '../users/user.model';
import { UsersService } from '../users/users.service';

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
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  async login(user: UserModel) {
    const payload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
