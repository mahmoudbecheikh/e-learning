import { Injectable } from '@nestjs/common';
import { Progress, ProgressDocument } from './entities/progress.entity';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Formation, FormationDocument } from '../formation/schemas/formation.schema';
import { Model } from 'mongoose';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { Cours, CoursDocument } from '../cours/entities/cours.entity';

@Injectable()
export class ProgressService {


  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Formation.name) private readonly formationModel: Model<FormationDocument>,
    @InjectModel(Progress.name) private readonly progressModel: Model<ProgressDocument>,
    @InjectModel(Cours.name) private readonly coursModel: Model<CoursDocument>,


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


  async find(user: string, formation: string): Promise<Progress> {
    console.log(user);
    console.log(formation);
    const progress = await this.progressModel.findOne({ user: user, formation: formation });
    if (progress)
      return progress.populate([
        {
          path: 'niveauActually',
          model: 'Niveau',
        },
        {
          path: 'formation',
          model: 'Formation',
        },
      ]);
    return null
  }

  async addCours(id: string, updateProgressDto: UpdateProgressDto) {

    const progress = await this.progressModel.findById(
      id,
      // { $push: { cours: updateProgressDto.cours } },
      // { new: true }
    ).populate([{
      path: 'niveauActually',
      model: 'Niveau',
    },{
      path:'formation',
      model:'Formation'
    }
  ],);

    if (progress) {
      const cours = await this.coursModel.findById(updateProgressDto.cours).exec()
      progress.completedCours.push(cours)
      if (progress.niveauActually.cours.length == progress.completedCours.length) {
        progress.completedCours = []
        progress.completedNiveau.push(progress.niveauActually)
        if (progress.completedNiveau.length < progress.formation.nbrNiveau)
          progress.niveauActually = progress.formation.niveau[progress.completedNiveau.length];
        else progress.finish = true
      }
      console.log(progress.completedNiveau.length);
      console.log( progress.formation.niveau[progress.completedNiveau.length-1]);
      progress.save()
    }


    return progress;



  }

}
