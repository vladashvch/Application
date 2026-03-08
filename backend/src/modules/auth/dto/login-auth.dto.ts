import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: 'user1@example.com' })
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  password: string;
}
