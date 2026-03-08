import { createParamDecorator, ExecutionContext } from '@nestjs/common';

interface UserPayload {
  id: string;
  email: string;
  name: string;
}

export const CurrentUser = createParamDecorator(
  (data: keyof UserPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserPayload;
    return data ? user[data] : user;
  },
);
