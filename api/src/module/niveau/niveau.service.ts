
/*import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Niveau } from './schemas/niveau.schema';
import { CreateNiveauDto } from './dto/create-niveau.dto';
import { UpdateNiveauDto } from './dto/update-niveau.dto';
import { Formation } from '../formation/schemas/formation.schema';
import { Cours } from '../cours/entities/cours.entity';

@Injectable()
export class NiveauService {
  constructor(
    @InjectModel(Niveau.name) private readonly niveauModel: Model<Niveau>,
    @InjectModel(Formation.name) private readonly formationModel: Model<Formation>,
    @InjectModel(Cours.name) private readonly coursModel:Model<Cours>
  ) {}

    
    async create(createNiveauDto: CreateNiveauDto): Promise<Niveau> {
       //creation de cours


      const newNiveau = new this.niveauModel(createNiveauDto);
      return newNiveau.save();
    }
  async findAll(): Promise<Niveau[]> {
    return this.niveauModel.find().exec();
  }

  async findOne(id: string): Promise<Niveau> {
    const niveau = await this.niveauModel.findById(id).exec();
    if (!niveau) {
      throw new NotFoundException(`Niveau with id ${id} not found`);
    }
    return niveau;
  }


    async update(id: string, updateNiveauDto: UpdateNiveauDto): Promise<Niveau> {
      const updatedNiveau = await this.niveauModel
        .findByIdAndUpdate({ niveauId: id }, updateNiveauDto, { new: true })
        .exec();
      if (!updatedNiveau) {
        throw new NotFoundException(`Niveau with id ${id} not found`);
      }
      return updatedNiveau;
    }
  
  async remove(id: string): Promise<void> {
    const result = await this.niveauModel.findByIdAndDelete(id).exec();
    
  }
}*/

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Niveau } from './schemas/niveau.schema';
import { CreateNiveauDto } from './dto/create-niveau.dto';
import { UpdateNiveauDto } from './dto/update-niveau.dto';
import { Formation } from '../formation/schemas/formation.schema';
import { Cours } from '../cours/entities/cours.entity';
import { CreateCourDto } from '../cours/dto/create-cours.dto';

@Injectable()
export class NiveauService {
  constructor(
    @InjectModel(Niveau.name) private readonly niveauModel: Model<Niveau>,
    @InjectModel(Formation.name) private readonly formationModel: Model<Formation>,
    @InjectModel(Cours.name) private readonly coursModel: Model<Cours>,
  ) {}

  async create(createNiveauDto: CreateNiveauDto): Promise<Niveau> {
    // Create and save Cours
    const coursIds = await Promise.all(
      createNiveauDto.cours.map(async (coursDto: CreateCourDto) => {
        const newCours = new this.coursModel(coursDto);
        return newCours.save();
      }),
    );

    // Create and save Niveau with Cours IDs
    const newNiveau = new this.niveauModel({
      ...createNiveauDto,
      cours: coursIds.map(cours => cours._id),
    });

    return newNiveau.save();
  }

  async findAll(): Promise<Niveau[]> {
    return this.niveauModel.find().populate('cours').exec();
  }

  async findOne(id: string): Promise<Niveau> {
    const niveau = await this.niveauModel.findById(id).exec();
    if (!niveau) {
      throw new NotFoundException(`Niveau with id ${id} not found`);
    }
    return niveau;
  }

  async update(id: string, updateNiveauDto: UpdateNiveauDto): Promise<Niveau> {
    const updatedNiveau = await this.niveauModel
      .findByIdAndUpdate(id, updateNiveauDto, { new: true })
      .exec();
    if (!updatedNiveau) {
      throw new NotFoundException(`Niveau with id ${id} not found`);
    }
    return updatedNiveau;
  }

  async remove(id: string): Promise<void> {
    const niveau = await this.niveauModel.findById(id).exec();
    if (!niveau) {
      throw new NotFoundException(`Niveau with id ${id} not found`);
    }

    // Delete associated Cours
    if (niveau.cours && niveau.cours.length > 0) {
      await this.coursModel.deleteMany({ _id: { $in: niveau.cours } }).exec();
    }

    await this.niveauModel.findByIdAndDelete(id).exec();
  }
}



