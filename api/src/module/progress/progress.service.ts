import { Injectable } from '@nestjs/common';
import { Progress, ProgressDocument } from './entities/progress.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Formation, FormationDocument } from '../formation/schemas/formation.schema';
import { Model } from 'mongoose';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';

@Injectable()
export class ProgressService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Formation.name) private readonly formationModel: Model<FormationDocument>,
    @InjectModel(Progress.name) private readonly progressModel: Model<ProgressDocument>,


  ) { }


  async create(createProgressDto: CreateProgressDto): Promise<Progress | null> {
    try {

      const user = await this.userModel.findById(createProgressDto.user).exec();
      if (!user) {
        throw new Error('User not found');
      }
      const formation = await this.formationModel.findById(createProgressDto.formation).exec();
      if (!formation) {
        throw new Error('Formation not found');
      }

      return (await new this.progressModel({
        formation: formation._id,
        niveauActually: formation.niveau[0],
        user: user._id,
      }).save())

    } catch (error) {
      console.error('Error creating message:', error);
      return null;
    }
  }


  async find(idUser: string, idFormation: string): Promise<Progress> {
    const progress = await this.progressModel.findOne({ user: idUser, formation: idFormation });
    if (progress)
      return progress.populate([
        {
          path: 'niveauActually',
          model: 'Niveau',
        },

      ]);
    return null
  }

  async addCours(id: string, cours: string) {

    const progress = await this.progressModel.findById(
      id,
      { $push: { cours: cours } },
      { new: true }
    );

    if (progress)
      if (progress.niveauActually.cours.length == progress.completedCours.length) {
        progress.completedCours = []
        progress.completedNiveau.push(progress.niveauActually)
        if (progress.completedNiveau.length<progress.formation.nbrNiveau)
          progress.niveauActually = progress.formation.niveau[progress.completedNiveau.length];
        else progress.finish = true
        progress.save()
      }

    return progress;



  }

  remove(id: number) {
    return `This action removes a #${id} progress`;
  }
}
