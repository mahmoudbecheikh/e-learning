import { Injectable } from '@nestjs/common';
import { CreateCourDto } from './dto/create-cours.dto';
// import { UpdateCourDto } from './dto/update-cours.dto';
import { Cours, CoursDocument } from './entities/cours.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { UpdateCourDto } from './dto/update-cours.dto';
import * as fs from 'fs';

@Injectable()
export class CoursService {
  constructor(
    @InjectModel(Cours.name) private readonly coursModel: Model<CoursDocument>,
  ) { }

  async create(createCourDto: CreateCourDto): Promise<Cours> {
    const newCours = await new this.coursModel(createCourDto);
    return newCours.save();
  }

  async findAll(): Promise<Cours[]> {
    return this.coursModel.find().exec();
  }

  findOne(id: string) {
    return this.coursModel.findById(id);
  }

  update(id: string, updateCourDto: any) {
    return this.coursModel.findByIdAndUpdate(id, updateCourDto);
  }

  async remove(id: string) {
    try {
      const cours = await this.coursModel.findById(id).exec();
      if (!cours) {
        throw new Error('cours not found');
      }
      if (cours.video) {
        try {
          fs.unlinkSync(cours.video.path);
        } catch (error) {
          console.error('Error deleting video file:', error);
        }
      }

      for (const file of cours.files) {
        try {
          fs.unlinkSync(file.path);
        } catch (error) {
          console.error('Error deleting file:', error);
        }
      }

      await this.coursModel.findByIdAndDelete(id).exec();

      return { message: 'cours and associated files deleted successfully' };
    } catch (error) {
      console.error('Error removing cours:', error);
      throw new Error('Error removing cours');
    }
  }

}
