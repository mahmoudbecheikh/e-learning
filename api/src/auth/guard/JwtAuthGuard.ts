import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    // constructor(private readonly jwtService: JwtService) {
    //     super();
    //   }
    
    //   async canActivate(context: ExecutionContext): Promise<boolean> {
    //     const request = context.switchToHttp().getRequest();
    //     const token = request.headers.authorization?.split(' ')[1];
    //     if (token) {
    //       try {
    //         const decoded = this.jwtService.verify(token);
    //         request.user = decoded;
    //       } catch (e) {
    //         throw new UnauthorizedException('Invalid token');
    //       }
    //     }
    //     return (await super.canActivate(context)) as boolean;
    //   }

    // canActivate(context: ExecutionContext): boolean {
    //     return super.canActivate(context) as boolean;
    //   }
    
    //   handleRequest(err, user, info) {
    //     if (err || !user) {
    //       throw err || new UnauthorizedException();
    //     }
    //     return user;
    //   }

    // constructor(private jwtService: JwtService) {
    //     super();
    //   }
    
    //   handleRequest(err, user, info) {
    //     if (err || !user) {
    //       throw err || new UnauthorizedException();
    //     }
    //     return user;
    //   }
}
