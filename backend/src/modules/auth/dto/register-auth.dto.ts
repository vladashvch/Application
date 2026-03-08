import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({ example: 'user1@example.com' })
  email: string;

  @ApiProperty({ example: 'password123', minLength: 6 })
  password: string;

  @ApiProperty({ example: 'Alice Johnson', minLength: 2 })
  name: string;
}
