import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppModule as AuthModule } from './auth/auth.module';
import { UserService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule, 
    PrismaModule, UserModule, UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService, UserService],
})
export class AppModule {}
