// src/user/user.service.ts or src/auth/auth.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path if needed
import { CreateAppUserDto } from './dto/create-user.dto'; // Your DTO for user creation
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService { // or AuthService
  constructor(private readonly prisma: PrismaService,
    private readonly configService: ConfigService, ) {}

  async createUser(dto: CreateAppUserDto) {

    const saltOrRounds = this.configService.get<number>('SALT_ROUND');
    if (typeof saltOrRounds !== 'string') {
      throw new InternalServerErrorException('ENV not configured yet.');
    }

    const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);

    const user = await this.prisma.appUser.create({
      data: {
        ...dto,
        password: hashedPassword,
        acusr_id: 0,
      },
      omit:{
        password: true
      }
    });
    return user;
  }
}