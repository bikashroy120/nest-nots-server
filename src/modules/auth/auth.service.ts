/* eslint-disable prettier/prettier */
import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
  constructor(private readonly userServices: UserService, private jwtService: JwtService) { }
  async registerUser(data: RegisterDto) {
    const user = await this.userServices.getUserByEmail(data.email)

    if (user) {
      throw new ConflictException("user already exists in this email")
    }

    const saltOrRounds = 10;
    const hashPassword = await bcrypt.hash(data.password, saltOrRounds);

    const createUser = await this.userServices.createUser({
      ...data,
      password: hashPassword,
    })
    if (!createUser) {
      throw new BadRequestException("failed to create user")
    }

    const payload = { sub: createUser.id, email: createUser.email };
    const token = await this.jwtService.signAsync(payload)
    return { accessToken: token }
  }

  async loginUser(data: LoginDto) {
    const user = await this.userServices.getUserByEmail(data.email)
    if (!user) {
      throw new UnauthorizedException("invalid email or password")
    }
    const isMachPassword = await bcrypt.compare(data.password, user.password)
    if (!isMachPassword) {
      throw new UnauthorizedException("invalid email or password")
    }

    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload)
    return { accessToken: token }
  }

  async getMe(id: number) {
    const user = await this.userServices.getUserById(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }


}
