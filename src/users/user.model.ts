import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import bcryptjs from 'bcryptjs';

const SALT_WORK_FACTOR = 10;

@Entity({ name: 'user' })
export default class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    const salt = bcryptjs.genSaltSync(SALT_WORK_FACTOR);
    this.password = bcryptjs.hashSync(this.password, salt);
  }

  comparePassword(attempt: string): Promise<boolean> {
    return bcryptjs.compare(attempt, this.password);
  }
}
