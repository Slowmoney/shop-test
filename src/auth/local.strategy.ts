import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(login: string, passport: string) {
    const user = await this.authService.validateUser(login, passport);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
