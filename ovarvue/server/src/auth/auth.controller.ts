import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { SignInDto } from './dto/signin-dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.validateUser(dto.email, dto.password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  me(@Req() req) {
    return this.authService.me(req.user);
  }

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.addUser(dto);
  }
}
