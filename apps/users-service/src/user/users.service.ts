import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    return await bcrypt.hash(password, salt);
  }
}
