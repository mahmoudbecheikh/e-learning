import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admin, Client, Employeur, User } from '../schemas/user.schema';

export const getUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

export const getClient = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Client => {
    const request = ctx.switchToHttp().getRequest();
    return request.client;
  },
);

export const getEmployeur = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Employeur => {
    const request = ctx.switchToHttp().getRequest();
    return request.employeur;
  },
);

export const getAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Admin => {
    const request = ctx.switchToHttp().getRequest();
    return request.admin;
  },
);
