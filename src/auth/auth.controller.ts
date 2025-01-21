import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(data: LoginDto) {
    return this.authService.login(data);
  }

  @MessagePattern('register')
  async register(data: RegisterDto) {
    return this.authService.register(data);
  }
}
