import {
  JwtPayload,
  JwtRefreshPayload,
} from '../../modules/auth/jwt/interfaces';
import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: (JwtPayload | JwtRefreshPayload) & { id: string };
}
