import { JwtPayload, JwtRefreshPayload } from '../jwt/interfaces';
import { Request } from 'express';

export interface CustomRequest extends Request {
  user?: (JwtPayload | JwtRefreshPayload) & { id: string };
}
