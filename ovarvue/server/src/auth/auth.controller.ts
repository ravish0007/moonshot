import { Controller, Get, Post, UseGuards, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup-dto';
import { SignInDto } from './dto/signin-dto';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    return this.authService.validateUser(dto.email, dto.password);
  }

  @Get('me')
  me(@Req() req) {
    return this.authService.me(req.user);
  }

  @Public()
  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.addUser(dto);
  }
}
