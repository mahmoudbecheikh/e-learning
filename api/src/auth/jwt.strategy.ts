import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './schemas/user.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload:any) {
    console.log('Payload:', payload); // Ajoutez ceci pour vérifier le payload

    const { sub: id } = payload;
    console.log('ID:', id); // Affiche l'ID extrait du payload


    const user = await this.userModel.findById(id);
    console.log('User:', user); // Affiche l'utilisateur trouvé dans la base de données

    
    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return user; 

    // const user = await this.userModel.findById(payload.sub).exec();
    // if (!user) {
    //   throw new UnauthorizedException('Login first to access this endpoint.');
    // }
    // return user; // Retourne l'utilisateur directement
  }
}
