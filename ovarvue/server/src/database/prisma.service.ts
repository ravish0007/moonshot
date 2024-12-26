import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
