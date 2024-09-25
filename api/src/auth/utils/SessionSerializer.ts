// import { Inject } from '@nestjs/common';
// import { PassportSerializer } from '@nestjs/passport';
// import { AuthService } from '../auth.service';
// import { User } from '../schemas/user.schema';
// import { JwtService } from '@nestjs/jwt';

// export class SessionSerializer extends PassportSerializer {

//   constructor(
//     private readonly authService: AuthService,
//     @Inject(JwtService) private readonly jwtService: JwtService,
//   ) {
//     super();
//   }

//   async serializeUser(user: any, done: (err: Error, user?: any) => void) {
//     try {
//       if (!user || !user.token) {
//         throw new Error('Invalid user object: Missing token property');
//       }
//       console.log('serializeUser received user:', user);
//       done(null, user.token);
//     } catch (error) {
//       done(error, null); 
//     }
//   }

//   async deserializeUser(userId: string, done: (err: Error, user: User | null) => void) {
//     try {
//       console.log('deserializeUser', userId);
//       const decodedToken = this.jwtService.decode(userId) as { id: string } | null;
//       if (!decodedToken || !decodedToken.id) {
//         throw new Error('Invalid token');
//       }
//       const userDB = await this.authService.findOne(decodedToken.id);
//       done(null, userDB || null);
//     } catch (error) {
//       done(error, null);
//     }
//   }
//   }


import { Injectable, Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../schemas/user.schema';

@Injectable()
export class SessionSerializer extends PassportSerializer {

  constructor(
    private readonly authService: AuthService,
    @Inject(JwtService) private readonly jwtService: JwtService,
  ) {
    super();
  }

  async serializeUser(user: any, done: (err: Error, user?: any) => void) {
    try {
      if (!user || !user.token) {
        throw new Error('Invalid user object: Missing token property');
      }
      console.log('serializeUser received user:', user);
      done(null, user.token);
    } catch (error) {
      done(error, null);
    }
  }

  async deserializeUser(token: string, done: (err: Error, user: User | null) => void) {
    try {
      console.log('deserializeUser', token);
      // Verify and decode the token
      const decodedToken = this.jwtService.verify(token) as { id: string } | null;
      if (!decodedToken || !decodedToken.id) {
        throw new Error('Invalid token');
      }
      const userDB = await this.authService.findOne(decodedToken.id);
      done(null, userDB || null);
    } catch (error) {
      done(error, null);
    }
  }
}
