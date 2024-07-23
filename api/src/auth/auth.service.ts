import { Injectable, BadRequestException, HttpException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { changePassDto } from './dto/changePass.dto';
import { EditProfileDto } from './dto/EditProfile.dto';
import * as bcrypt from 'bcryptjs';
import {User } from './schemas/user.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private mailerService: MailerService,

    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  
  ) {}


  //le client seulement peut faire le signup
  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { nom, prenom, email, password, numtel, cin, datelastcnx ,secteur,nomEntreprise,poste} = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      nom,
      prenom,
      email,
      password: hashedPassword,
      numtel,
      cin,
      datelastcnx,
      secteur,
      nomEntreprise,
      poste,
      role: Role.Client, // Assign the role 'client' automatically

    });

    const token = this.jwtService.sign({ id: user._id.toString() });

    return { token };
  }


  async login(loginDto: LoginDto): Promise<{ id: string, token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email }).exec();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id, role: user.constructor.name };
    const token = this.jwtService.sign(payload);

    return { id: user._id.toString(), token };
  }



  findAll() {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User> {
    try {
      return await this.userModel.findById(id).exec();
    } catch (error) {
      throw new Error(`Erreur lors de la recherche de l'utilisateur : ${error.message}`);
    }
  }

  async update(id: string, body: SignUpDto) {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.userModel.findByIdAndUpdate(id, body, { new: true });
  }


  async delete(id: string) {
    try {
      const result = await this.userModel.deleteOne({ _id: id });
  
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
      }
  
      return { success: true, message: 'Utilisateur supprimé avec succès' };
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de l'utilisateur : ${error.message}`);
    }
  }
  

  async findByEmail(email: string): Promise<User> {
    console.log('Recherche d\'utilisateur par email :', email);
    return this.userModel.findOne({ email });
  }

  async updateProfile(id: string, body: EditProfileDto): Promise<User> {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
      }

      if (body.nom) {
        user.nom = body.nom;
      }
      if (body.prenom) {
        user.prenom = body.prenom;
      }
      if (body.email) {
        user.email = body.email;
      }
      if (body.password) {
        user.password = body.password;
      }
      if (body.numtel) {
        user.numtel = body.numtel;
      }
      if (body.cin) {
        user.cin = body.cin;
      }
      if (body.datelastcnx) {
        user.datelastcnx = body.datelastcnx;
      }
      

      await user.save();

      return user;
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de l'utilisateur : ${error.message}`);
    }
  }


  async changePass(changePassDto: changePassDto, user: User) {
    try {
      if (changePassDto.confirmNewPass !== changePassDto.newPass) {
        throw new HttpException(
          'La confirmation du mot de passe ne correspond pas au mot de passe',
          HttpStatus.BAD_REQUEST,
        );
      }
      const currentUser = await this.userModel.findById(user._id);

      if (!currentUser) {
        throw new HttpException(
          'Utilisateur introuvable. Veuillez vous connecter à nouveau.',
          HttpStatus.BAD_REQUEST,
        );
      }
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(changePassDto.newPass, salt);
      const updatedUser = await this.userModel.findByIdAndUpdate(
        user._id,
        { password: hashedPassword, salt: salt },
        { new: true },
      );
      return updatedUser;
    } catch (error) {
      throw new HttpException(
        `Erreur lors du changement de mot de passe: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async updateUserValue(id: string, updatedFields: Record<string, any>): Promise<User> {
    try {
      const updatedUser = await this.userModel.findOneAndUpdate(
        { _id: id },
        { $set: updatedFields },
        { new: true }
      );

      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async findOneById(id: string): Promise<User> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }

    try {
      console.log('Trying to find user with ID:', id);
      const user = await this.userModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      console.log('User found:', user); // Ajoutez ce log pour vérifier si l'utilisateur est trouvé
      return user;
    } catch (error) {
      console.error('Error finding user:', error); // Ajoutez ce log pour capturer les erreurs
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  async getProfile(user: User) {
    try {
      const userProfile = await this.userModel.findById(user._id);
      if (!userProfile) {
        throw new HttpException(
          'Utilisateur introuvable. Veuillez vous reconnecter.',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return userProfile;
    } catch (error) {
      throw new HttpException(
        `Une erreur s'est produite lors de la récupération du profil : ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }


  async addUser(userData: Partial<User>): Promise<User> {
    try {
      const newUser = new this.userModel(userData);
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException(`Erreur lors de l'ajout du user : ${error.message}`);
    }
  }
  async findUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

//employeur 
async findClients(): Promise<User[]> {
  return this.userModel.find({ role: Role.Client }).exec();
}
  //employeur 
  async findEmployeurs(): Promise<User[]> {
    return this.userModel.find({ role: Role.Employeur }).exec();
  }

  //employeur 
  async findAdmins(): Promise<User[]> {
    return this.userModel.find({ role: Role.Admin }).exec();
  }


  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const token = this.jwtService.sign({ userId: user._id, role: user.role }, { expiresIn: '1h' });
    const url = `http://localhost:3000/reset-password/${token}`;
    const htmlContent = `
      <p>Bonjour ${user.nom},</p>
      <p>Vous avez demandé à réinitialiser votre mot de passe. Veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
      <p><a href="${url}">Réinitialiser le mot de passe</a></p>
      <p>Ce lien expire dans une heure.</p>
    `;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset',
      html: htmlContent,
    });
  }
  
  private async findUserByEmail(email: string): Promise<any> {
    let user = await this.userModel.findOne({ email }).exec();
    if (user) return { ...user.toObject(), role: 'user' };
  
    return null;
  }

  
  
  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const payload = this.jwtService.verify(token);
      const { userId, role } = payload;
  
      let user;
      if (role === 'user') {
        user = await this.userModel.findById(userId).exec();
      } 
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();
    } catch (e) {
      throw new BadRequestException('Invalid or expired token');
    }
  }
  



}
