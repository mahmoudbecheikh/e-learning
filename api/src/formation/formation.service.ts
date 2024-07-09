import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Formation } from './schemas/formation.schema';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';

@Injectable()
export class FormationService {
  constructor(@InjectModel(Formation.name) private formationModel: Model<Formation>) {}

  async create(createFormationDto: CreateFormationDto): Promise<Formation> {
    const createdFormation = new this.formationModel(createFormationDto);
    return createdFormation.save();
  }

  async update(id: string, updateFormationDto: UpdateFormationDto): Promise<Formation> {
    return this.formationModel.findByIdAndUpdate(id, updateFormationDto, { new: true }).exec();
  }
  async destroy(id:string):Promise<Formation>{
    return this.formationModel.findByIdAndDelete(id);
  }

  async getAll():Promise<Formation []> {
   return this.formationModel.find().exec();
  }
  
  async getById(id:string):Promise<Formation>{
    return this.formationModel.findById(id);
  }
}
