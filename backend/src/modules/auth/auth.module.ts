import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { JwtTokenService } from './jwt/jwt-token';

@Module({
  imports: [DatabaseModule, ConfigModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtTokenService],
})
export class AuthModule {}
