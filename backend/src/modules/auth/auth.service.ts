import { Injectable } from '@nestjs/common';
import { AuthResponseDto, LoginAuthDto, RegisterAuthDto } from './dto';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { JwtTokenService } from './jwt/jwt-token';
import { AuthValidator } from './helpers/auth-validator';
import { SuccessResponseDto } from 'src/common/dto/success-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwtToken: JwtTokenService,
  ) {}

  async register(dto: RegisterAuthDto): Promise<AuthResponseDto> {
    await AuthValidator.assertEmailNotTaken(dto.email, this.database);
    const passwordHash = await AuthValidator.hashPassword(dto.password);

    const user = await this.database.user.create({
      data: {
        email: dto.email,
        password: passwordHash,
        name: dto.name,
      },
    });

    return this.generateTokens({
      id: user.id,
      name: user.name,
    });
  }

  async login(dto: LoginAuthDto): Promise<AuthResponseDto> {
    const user = await AuthValidator.findUserByEmailOrFail(
      dto.email,
      this.database,
    );
    await AuthValidator.assertPasswordValid(dto.password, user.password);

    return this.generateTokens({
      id: user.id,
      name: user.name,
    });
  }

  private async generateTokens(user: {
    id: string;
    name: string;
  }): Promise<AuthResponseDto> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtToken.generateAccessToken({ sub: user.id, name: user.name }),
      this.jwtToken.generateRefreshToken({ sub: user.id }),
    ]);

    await this.database.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken, name: user.name };
  }

  async refresh(userId: string): Promise<Partial<AuthResponseDto>> {
    const user = await AuthValidator.findUserByIdOrFail(userId, this.database);

    AuthValidator.findRefreshToken(user.refreshToken);

    const accessToken = await this.jwtToken.generateAccessToken({
      sub: user.id,
      name: user.name,
    });

    return { accessToken };
  }

  async logout(userId: string): Promise<SuccessResponseDto> {
    await this.database.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return { success: true };
  }
}
