import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../modules/auth/jwt/interfaces';
import { CustomRequest } from './custom-request';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<CustomRequest>();
    const token = this.extractToken(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });
      if (payload.type !== 'access') throw new UnauthorizedException();

      request.user = { ...payload, id: payload.sub };
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractToken(request: CustomRequest): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : undefined;
  }
}
