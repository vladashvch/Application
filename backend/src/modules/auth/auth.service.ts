import { Injectable } from '@nestjs/common';
import { LoginAuthDto, RegisterAuthDto } from './dto';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { JwtTokenService } from './jwt/jwt-token';
import { AuthValidator } from './helpers/validation/auth-validator';

@Injectable()
export class AuthService {
  constructor(
    private readonly database: DatabaseService,
    private readonly jwtToken: JwtTokenService,
  ) {}

  public async register(dto: RegisterAuthDto) {
    await AuthValidator.assertEmailNotTaken(dto.email, this.database);
    const passwordHash = await AuthValidator.hashPassword(dto.password);

    const user = await this.database.user.create({
      data: {
        email: dto.email,
        password: passwordHash,
        name: dto.name,
      },
    });

    return this.generateTokens({ id: user.id, email: user.email });
  }

  async login(dto: LoginAuthDto) {
    const user = await AuthValidator.findUserByEmailOrFail(
      dto.email,
      this.database,
    );
    await AuthValidator.assertPasswordValid(dto.password, user.password);

    return this.generateTokens({ id: user.id, email: user.email });
  }

  private async generateTokens(user: { id: string; email: string }) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtToken.generateAccessToken({ sub: user.id, email: user.email }),
      this.jwtToken.generateRefreshToken({ sub: user.id }),
    ]);

    await this.database.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    return { accessToken, refreshToken };
  }

  async refresh(userId: string) {
    const user = await AuthValidator.findUserByIdOrFail(userId, this.database);
    const accessToken = await this.jwtToken.generateAccessToken({
      sub: user.id,
      email: user.email,
    });

    return { accessToken };
  }

  async logout(userId: string) {
    await this.database.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return { success: true };
  }
}
