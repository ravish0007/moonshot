import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '@src/users/users.service';
import { SignUpDto } from './dto/signup-dto';
import { throwIfEmpty } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email, password) {
    const user = await this.usersService.findUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    const token = await this.jwtService.signAsync({ sub: user.email });

    delete user.password;
    return { token, ...user };
  }

  async me(user) {
    const email = user.sub;

    const dbuser = await this.usersService.findUser(email);
    if (!dbuser) {
      throw new UnauthorizedException();
    }

    delete dbuser.password;
    return { ...dbuser };
  }

  async addUser(dto: SignUpDto) {
    const user = await this.usersService.findUser(dto.email);

    if (user) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      Number(process.env.ROUNDS),
    );

    await this.usersService.insertUser(
      dto.email,
      dto.first_name,
      dto.last_name,
      hashedPassword,
    );

    return { success: true };
  }
}
