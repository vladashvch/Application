import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, JwtRefreshPayload } from './interfaces';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private generateToken(
    payload: JwtPayload | JwtRefreshPayload,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow(secret),
      expiresIn: this.configService.getOrThrow(expiresIn),
    });
  }

  generateAccessToken(payload: Omit<JwtPayload, 'type'>): Promise<string> {
    return this.generateToken(
      { ...payload, type: 'access' },
      'JWT_SECRET',
      'JWT_EXPIRES_IN',
    );
  }

  generateRefreshToken(
    payload: Omit<JwtRefreshPayload, 'type'>,
  ): Promise<string> {
    return this.generateToken(
      { ...payload, type: 'refresh' },
      'JWT_REFRESH_SECRET',
      'JWT_REFRESH_EXPIRES_IN',
    );
  }
}
