import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AllowAllGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    return true;
  }
}
