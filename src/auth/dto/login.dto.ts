import { ApiProperty } from '@nestjs/swagger';
export class LoginDto {
  @ApiProperty({ description: 'The email or phone number of the user' })
  username: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;
}
export class RegisterDto {
  username: string;
  email: string;
  password: string;
}
