import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserModel from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel) private usersRepository: Repository<UserModel>,
  ) {}
  async findById(id: number): Promise<UserModel | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
  async findByUserName(username: string): Promise<UserModel | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }
  async create(username: string, password: string) {
    const user = new UserModel();
    user.username = username;
    user.password = password;
    return this.usersRepository.save(user);
  }
}
