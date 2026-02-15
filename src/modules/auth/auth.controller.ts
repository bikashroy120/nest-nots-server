/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async create(@Res({ passthrough: true }) res: Response, @Body() data: RegisterDto) {
    const result = await this.authService.registerUser(data);
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000, // 15 minutes
    });

    return result
  }

  @Post("login")
  async login(@Res({ passthrough: true }) res: Response, @Body() data: LoginDto) {
    const result = await this.authService.loginUser(data)
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });
    return result;
  }
}
