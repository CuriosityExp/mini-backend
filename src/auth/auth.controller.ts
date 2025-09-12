// src/auth/auth.controller.ts

import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    // We use a generic DTO here for simplicity. In a real app,
    // you should create a specific LoginDto class.
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signUp(@Body() signInDto: Record<string, any>) {
    // We use a generic DTO here for simplicity. In a real app,
    // you should create a specific LoginDto class.
    return this.userService.createUser({
      email: signInDto.email,
      password: signInDto.password,
      username: signInDto.password,
    });
  }
}
