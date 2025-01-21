// import { Controller } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { MessagePattern } from '@nestjs/microservices';
// import { LoginDto } from './dto/login.dto';
// import { RegisterDto } from './dto/login.dto';
// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// @ApiTags('Auth')  // Grouping related API methods
// @Controller('auth')
// export class AuthController {
//   constructor(private readonly authService: AuthService) {}

//   @MessagePattern('login')
//   async login(data: LoginDto) {
//     return this.authService.login(data);
//   }

//   @MessagePattern('register')
//   async register(data: RegisterDto) {
//     return this.authService.register(data);
//   }
// }
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth') // Grouping related API methods
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login to get JWT token' })
  @ApiResponse({ status: 200, description: 'Successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async register(@Body() registerDto: any) {
    return this.authService.register(registerDto);
  }
}
