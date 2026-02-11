/* eslint-disable prettier/prettier */
import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {
  constructor(private readonly userServices: UserService) { }
  async create(data: RegisterDto) {
    const user = await this.userServices.getUserByEmail(data.email)

    if (user) {
      throw new ConflictException("user already exists in this email")
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }


}
