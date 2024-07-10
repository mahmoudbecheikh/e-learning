import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService){
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string, done: (error: any, user?: any, info?: any) => void): Promise<any> {
        try {
          const loginDto: LoginDto = { email, password };
          const user = await this.authService.login(loginDto);
      
          if (!user) {
            return done(new UnauthorizedException('Invalid email or password'), null);
          }
      
          // Make sure user object has 'id' and 'role' properties
          // Make sure user object has 'id' and 'role' properties
          
          // if (!user.id) {
          //   return done(new UnauthorizedException('User object is missing ID'), null);
          // }
      
          return done(null, { id: user.id, token: user.token});
        } catch (error) {
          return done(error, null);
        }
      }
          
                
                }
