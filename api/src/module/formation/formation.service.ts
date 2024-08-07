
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types,Document } from 'mongoose';
import { Formation } from './schemas/formation.schema';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import * as nodemailer from 'nodemailer';
import { Niveau } from 'src/module/niveau/schemas/niveau.schema';
import { Cours } from '../cours/entities/cours.entity';
import { User } from 'src/auth/schemas/user.schema';

/*@Injectable()
export class FormationService {
  findOne: any;
  findById: any;
  constructor(
    @InjectModel(Formation.name) private formationModel: Model<Formation>,
    @InjectModel(Niveau.name) private readonly niveauModel: Model<Niveau>,
  ) { }

  async create(createFormationDto: CreateFormationDto): Promise<Formation> {
    console.log('Creating formation with data:', createFormationDto);

    // Create and save Niveau objects
    const niveaux = await Promise.all(
      createFormationDto.niveau.map(async (niveauDto) => {
        const newNiveau = new this.niveauModel(niveauDto);
        return newNiveau.save();
      }),
    );

    // Create Formation with Niveau IDs
    const createdFormation = new this.formationModel({
      ...createFormationDto,
      niveaux: niveaux.map(niveau => niveau._id),
    });
    const savedFormation = await createdFormation.save();

    console.log('Formation created:', savedFormation);

  // If related data is required, validate it here
  // const users = await this.userModel.find().exec();
  // if (users.length === 0) {
  //   throw new Error('No users found to notify');
  // }
    
  //   await this.sendEmailNotifications(users, savedFormation);
    // If related data is required, validate it here
    const users = await this.userModel.find().exec();
    if (users.length === 0) {
      throw new Error('No users found to notify');
    }

    await this.sendEmailNotifications(users, savedFormation);

    return savedFormation;
  }

  async update(id: string, updateFormationDto: UpdateFormationDto): Promise<Formation> {
    return this.formationModel.findByIdAndUpdate(id, updateFormationDto, { new: true }).populate('niveaux').exec();
  }

  async destroy(id: string): Promise<Formation> {
    id = id.trim();

    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }

    const objectId = new Types.ObjectId(id);

    const formation = await this.formationModel.findById(objectId).exec();
    if (!formation) {
      throw new NotFoundException(`Formation with id ${id} not found`);
    }

    if (formation.niveaux && formation.niveaux.length > 0) {
      const niveauIds = formation.niveaux
        .map(niveau => niveau instanceof Document ? (niveau as any)._id : niveau)
        .filter(id => id !== null);

      if (niveauIds.length > 0) {
        console.log('Deleting Niveaux with IDs:', niveauIds); // Add logging for debugging
        await this.niveauModel.deleteMany({ _id: { $in: niveauIds } }).exec();
      }
    }

    return this.formationModel.findByIdAndDelete(objectId).exec();
  }
  async getAll(): Promise<Formation[]> {
    return this.formationModel.find().populate('niveaux').exec();
  }
  async addLevel(id: string, niveau: Niveau): Promise<Formation> {
    const formation = await this.findById(id);
    formation.niveau.push(niveau);
    return formation.save();
  }

  async getById(id: string): Promise<Formation> {
    return this.formationModel.findById(id)
      .populate('niveaux')
      .populate({
        path: 'forums.user',
        model: 'User'
      })
      .exec();
  }

  // private async sendEmailNotifications(users: User[], formation: Formation) {
  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'eyabenamara288@gmail.com',
  //       pass: 'qwfw xoyf bxlt ezdm',
  //     },
  //   });

  //   for (const user of users) {
  //     const mailOptions = {
  //       from: 'eyabenamara288@gmail.com', 
  //       to: user.email,
  //       subject: `New Formation Available: ${formation.titre}`,
  //       text: `A new formation titled "${formation.titre}" is now available. Check it out!`,
  //     };

  //     try {
  //       await transporter.sendMail(mailOptions);
  //       console.log(`Email sent to ${user.email}`);
  //     } catch (error) {
  //       console.error(`Failed to send email to ${user.email}:`, error);
  //     }
  //   }
  // }
    for (const user of users) {
      const mailOptions = {
        from: 'eyabenamara288@gmail.com',
        to: user.email,
        subject: `New Formation Available: ${formation.titre}`,
        text: `A new formation titled "${formation.titre}" is now available. Check it out!`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${user.email}`);
      } catch (error) {
        console.error(`Failed to send email to ${user.email}:`, error);
      }
    }
  }
}*/
@Injectable()
export class FormationService {
  findById: any;
  constructor(
    @InjectModel(Formation.name) private formationModel: Model<Formation>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Niveau.name) private niveauModel: Model<Niveau>,
    @InjectModel(Cours.name) private coursModel: Model<Niveau>,
  ) {}

  async create(createFormationDto: CreateFormationDto): Promise<Formation> {
    console.log('Creating formation with data:', createFormationDto);

    // Create and save Niveau objects
    const niveaux = await Promise.all(
      createFormationDto.niveau.map(async (niveauDto) => {
        const newNiveau = new this.niveauModel(niveauDto);
        return newNiveau.save();
      }),
    );

    // Create Formation with Niveau IDs
    const createdFormation = new this.formationModel({
      ...createFormationDto,
      niveau: niveaux.map(niveau => niveau._id),
    });
    const savedFormation = await createdFormation.save();

    console.log('Formation created:', savedFormation);

    const users = await this.userModel.find().exec();
    if (users.length === 0) {
      throw new Error('No users found to notify');
    }

    //await this.sendEmailNotifications(users, savedFormation);

    return savedFormation;
  }

  async update(id: string, updateFormationDto: UpdateFormationDto): Promise<Formation> {
    return this.formationModel.findByIdAndUpdate(id, updateFormationDto, { new: true }).populate('niveau').exec();
  }

 /* async destroy(id: string): Promise<Formation> {
    id = id.trim();

    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Invalid ID format: ${id}`);
    }

    const objectId = new Types.ObjectId(id);

    const formation = await this.formationModel.findById(objectId).exec();
    if (!formation) {
      throw new NotFoundException(`Formation with id ${id} not found`);
    }

    if (formation.niveau && formation.niveau.length > 0) {
      const niveauIds = formation.niveau
        .map(niveau => niveau instanceof Document ? (niveau as any)._id : niveau)
        .filter(id => id !== null);

      if (niveauIds.length > 0) {
        console.log('Deleting Niveaux with IDs:', niveauIds); 
        await this.niveauModel.deleteMany({ _id: { $in: niveauIds } }).exec();
      }
    }

    return this.formationModel.findByIdAndDelete(objectId).exec();
  }*/

    async destroy(id: string): Promise<{ message: string }>  {
      id = id.trim();
    
      if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException(`Invalid ID format: ${id}`);
      }
    
      const objectId = new Types.ObjectId(id);
    
      const formation = await this.formationModel.findById(objectId).exec();
      if (!formation) {
        throw new NotFoundException(`Formation with id ${id} not found`);
      }
    
      // Delete associated Niveaux and their Cours
      if (formation.niveau && formation.niveau.length > 0) {
        const niveauIds = formation.niveau.map(niveau => new Types.ObjectId(niveau._id as any));
        if (niveauIds.length > 0) {
          console.log('Deleting Niveaux with IDs:', niveauIds);
          await Promise.all(
            niveauIds.map(async (niveauId) => {
              const niveau = await this.niveauModel.findById(niveauId).exec();
              if (niveau && niveau.cours.length > 0) {
                const coursIds = niveau.cours.map(coursId => new Types.ObjectId(coursId as any));
                await this.coursModel.deleteMany({ _id: { $in: coursIds } }).exec();
              }
            }),
          );
          await this.niveauModel.deleteMany({ _id: { $in: niveauIds } }).exec();
        }
      }
    
      await this.formationModel.findByIdAndDelete(objectId).exec();
      return { message: 'Formation, niveaux, and courses successfully deleted' };
    }
    

  async getAll(): Promise<Formation[]> {
    return this.formationModel.find().populate('niveau').exec();
  }

  async addLevel(id: string, niveau: Niveau): Promise<Formation> {
    const formation = await this.findById(id);
    formation.niveau.push(niveau);
    return formation.save();
  }

  async getById(id: string): Promise<Formation> {
    return this.formationModel.findById(id).populate('niveau').exec();
  }

  /*private async sendEmailNotifications(users: User[], formation: Formation) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'eyabenamara288@gmail.com',
        pass: 'qwfw xoyf bxlt ezdm',
      },
    });

    for (const user of users) {
      const mailOptions = {
        from: 'eyabenamara288@gmail.com',
        to: user.email,
        subject: `New Formation Available: ${formation.titre}`,
        text: `A new formation titled "${formation.titre}" is now available. Check it out!`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${user.email}`);
      } catch (error) {
        console.error(`Failed to send email to ${user.email}:`, error);
      }
    }
  }*/
}
