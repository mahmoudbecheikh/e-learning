import { Injectable } from '@nestjs/common';
import { CreateCourDto } from './dto/create-cours.dto';
// import { UpdateCourDto } from './dto/update-cours.dto';
import { Cours, CoursDocument } from './entities/cours.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { UpdateCourDto } from './dto/update-cours.dto';

@Injectable()
export class CoursService {
  constructor(
    @InjectModel(Cours.name) private readonly coursModel: Model<CoursDocument>,
  ) {}

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

  remove(id: string) {
    return this.coursModel.findByIdAndDelete(id);
  }
}
