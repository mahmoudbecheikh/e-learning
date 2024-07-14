import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../schemas/user.schema';

export const getUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
