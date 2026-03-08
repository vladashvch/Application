import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { DatabaseService } from 'src/infrastructure/database/database.service';
import { ERROR_MESSAGES } from '../../../common/error-messages';

export class AuthValidator {
  static async assertEmailNotTaken(
    email: string,
    database: DatabaseService,
  ): Promise<void> {
    const user = await database.user.findUnique({ where: { email } });
    if (user) throw new ConflictException(ERROR_MESSAGES.EMAIL_TAKEN);
  }

  static async findUserByEmailOrFail(email: string, database: DatabaseService) {
    const user = await database.user.findUnique({ where: { email } });
    if (!user)
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    return user;
  }

  static async findUserByIdOrFail(id: string, database: DatabaseService) {
    const user = await database.user.findUnique({ where: { id } });
    if (!user)
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
    return user;
  }

  static async assertPasswordValid(
    password: string,
    userPasswordHash: string,
  ): Promise<void> {
    const isValid = await compare(password, userPasswordHash);
    if (!isValid)
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  static async hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }

  static findRefreshToken(token: string | null) {
    if (!token)
      throw new UnauthorizedException(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }
}
