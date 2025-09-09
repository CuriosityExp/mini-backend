import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();

    // This is the middleware logic
    this.$use(async (params, next) => {
      // Check if the query is for the AppUser model AND
      // if the action is 'create' or 'update'
      if (params.model === 'AppUser' && (params.action === 'create' || params.action === 'update')) {
        
        // Check if we are passing data (required for create/update)
        if (params.args.data && params.args.data.password) {
          const password = params.args.data.password;
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(password, salt);
          
          // Overwrite the plain-text password with the hash
          params.args.data.password = hashedPassword;
        }
      }

      // Continue the original Prisma operation (now with the modified params)
      return next(params);
    });
  }
  
  async onModuleInit() {
    // This connects to the database as soon as the module is initialized.
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}