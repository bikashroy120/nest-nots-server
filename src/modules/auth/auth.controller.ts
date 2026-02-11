/* eslint-disable prettier/prettier */
import { Controller, Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async create(@Body() data: RegisterDto) {
    return await this.authService.registerUser(data);
  }

  @Post("login")
  async login(@Body() data: LoginDto) {
    const result = await this.authService.loginUser(data)
    return result;
  }
}
