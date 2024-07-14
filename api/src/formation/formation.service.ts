
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Formation } from './schemas/formation.schema';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import * as nodemailer from 'nodemailer';
import { Client } from 'src/auth/schemas/user.schema';

@Injectable()
export class FormationService {
  constructor(
    @InjectModel(Formation.name) private formationModel: Model<Formation>,
    @InjectModel(Client.name) private clientModel: Model<Client>,
  ) {}

  async create(createFormationDto: CreateFormationDto): Promise<Formation> {
    console.log('Creating formation with data:', createFormationDto);
    const createdFormation = new this.formationModel(createFormationDto);
    const savedFormation = await createdFormation.save();

    console.log('Formation created:', savedFormation);

  // If related data is required, validate it here
  const clients = await this.clientModel.find().exec();
  if (clients.length === 0) {
    throw new Error('No clients found to notify');
  }
    
    await this.sendEmailNotifications(clients, savedFormation);

    return savedFormation;
  }

  async update(id: string, updateFormationDto: UpdateFormationDto): Promise<Formation> {
    return this.formationModel.findByIdAndUpdate(id, updateFormationDto, { new: true }).exec();
  }

  async destroy(id: string): Promise<Formation> {
    return this.formationModel.findByIdAndDelete(id);
  }

  async getAll(): Promise<Formation[]> {
    return this.formationModel.find().exec();
  }

  async getById(id: string): Promise<Formation> {
    return this.formationModel.findById(id).exec();
  }

  private async sendEmailNotifications(clients: Client[], formation: Formation) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'eyabenamara288@gmail.com',
        pass: 'qwfw xoyf bxlt ezdm',
      },
    });

    for (const client of clients) {
      const mailOptions = {
        from: 'eyabenamara288@gmail.com', 
        to: client.email,
        subject: `New Formation Available: ${formation.titre}`,
        text: `A new formation titled "${formation.titre}" is now available. Check it out!`,
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${client.email}`);
      } catch (error) {
        console.error(`Failed to send email to ${client.email}:`, error);
      }
    }
  }
}
