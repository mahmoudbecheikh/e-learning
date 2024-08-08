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
    @InjectModel(Formation.name) private readonly formationModel: Model<Formation>,
    @InjectModel(Progress.name) private readonly progressModel: Model<Progress>,
    @InjectModel(Cours.name) private readonly coursModel: Model<Cours>,


  ) { }


  async create(user: User, formation: Formation): Promise<Progress | null> {
    try {
      return (await new this.progressModel({
        formation: formation,
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
          path: 'completedNiveau',
          model: 'Niveau'
        },
        {
          path: 'formation',
          populate: {
            path: 'niveau',
            model:'Niveau'
          }
        }

      ]);
    console.log(progress);
    return null
  }

  async addCours(id: string, updateProgressDto: UpdateProgressDto) {
    try {
      // Trouver le progrès en cours avec les informations nécessaires
      const progress = await this.progressModel.findById(id)
        .populate({
          path: 'niveauActually',
          model: 'Niveau'
        })
        .populate({
          path: 'formation',
          model: 'Formation',
          populate: {
            path: 'niveau',
            model: 'Niveau'
          }
        })
        .exec();
    
      if (!progress) {
        throw new Error('Progress not found');
      }
  
      const cours = await this.coursModel.findById(updateProgressDto.cours).exec();
      if (!cours) {
        throw new Error('Course not found');
      }
  
      progress.completedCours.push(cours);
  
      const allCoursesCompleted = progress.niveauActually.cours.every(course =>
        progress.completedCours.some(completedCourse => completedCourse._id.equals(course._id))
      );

      if (allCoursesCompleted) {
        progress.completedCours = [];
  
        const completedNiveau = progress.formation.niveau[progress.completedNiveau.length];
        if (completedNiveau) {
          progress.completedNiveau.push(completedNiveau._id);
        }
  
        if (progress.completedNiveau.length < progress.formation.nbrNiveau) {
          progress.niveauActually = progress.formation.niveau[progress.completedNiveau.length];
        } else {
          progress.niveauActually=null
          progress.finish = true;
        }
      }
  
      await progress.save();
  
      return progress;
    } catch (error) {
      console.error('Error in addCours:', error);
      throw error;
    }
  }
  
  
}
