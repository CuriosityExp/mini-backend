// src/auth/auth.service.ts

import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAppUserDto } from 'src/users/dto/create-user.dto';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.prisma.appUser.findUnique({
      where:{
        username,
        isDeleted: false
      }
    })
    console.log(user);
    if (!user) {
      throw new NotFoundException();
    }
    if (username !== 'john' || pass !== 'changeme') {
      throw new UnauthorizedException();
    }

    const payload = { sub: 1, username: username }; // 'sub' is standard for user ID

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}