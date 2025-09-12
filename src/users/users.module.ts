import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
// Make sure you have PrismaModule or similar if needed
// import { PrismaModule } from '../prisma/prisma.module';

@Module({
  // imports: [PrismaModule], // If your service depends on Prisma
  controllers: [UsersController],
  providers: [UserService],
  exports: [UserService], // <-- THIS IS THE CRITICAL LINE TO ADD
})
export class UsersModule {}