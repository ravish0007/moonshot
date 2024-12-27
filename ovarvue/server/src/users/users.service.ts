import { Injectable } from '@nestjs/common';
import { DatabaseService } from '@src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}

  async findUser(email: string) {
    const user = await this.databaseService.user.findUnique({
      where: { email },
    });
    return user;
  }

  async insertUser(email, first_name, last_name, password) {
    const user = await this.databaseService.user.create({
      data: {
        email,
        first_name,
        last_name,
        password,
      },
    });

    return;
  }
}
