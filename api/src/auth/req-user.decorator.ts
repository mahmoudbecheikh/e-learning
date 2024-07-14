import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Définir une interface personnalisée étendant l'interface Request d'Express
interface CustomRequest extends Request {
  user: any; // Type de votre objet user
}

export const ReqUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: CustomRequest = ctx.switchToHttp().getRequest<CustomRequest>();
    if (data) {
      return request.user[data];
    }
    return request.user;
  },
);
