/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Res, Get, UseGuards, Req, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import type { Request, Response } from 'express';
import { AuthGuard } from 'src/common/guard/auth.guard';

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

  @Get("me")
  @UseGuards(AuthGuard)
  async getMe(@Req() req: Request) {
    const id = req.user?.sub as number;
    const result = await this.authService.getMe(id)
    return result;
  }
}
