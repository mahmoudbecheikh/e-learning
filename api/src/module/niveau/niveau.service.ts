import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Niveau } from './schemas/niveau.schema';
import { CreateNiveauDto } from './dto/create-niveau.dto';
import { UpdateNiveauDto } from './dto/update-niveau.dto';

@Injectable()
export class NiveauService {
  constructor(
    @InjectModel(Niveau.name) private readonly niveauModel: Model<Niveau>,
  ) {}

  async create(createNiveauDto: CreateNiveauDto): Promise<Niveau> {
    const newNiveau = new this.niveauModel(createNiveauDto);
    return newNiveau.save();
  }

  async findAll(): Promise<Niveau[]> {
    return this.niveauModel.find().exec();
  }

  async findOne(id: number): Promise<Niveau> {
    const niveau = await this.niveauModel.findById(id).exec();
    if (!niveau) {
      throw new NotFoundException(`Niveau with id ${id} not found`);
    }
    return niveau;
  }

  async update(id: number, updateNiveauDto: UpdateNiveauDto): Promise<Niveau> {
    const updatedNiveau = await this.niveauModel
      .findByIdAndUpdate({ niveauId: id }, updateNiveauDto, { new: true })
      .exec();
    if (!updatedNiveau) {
      throw new NotFoundException(`Niveau with id ${id} not found`);
    }
    return updatedNiveau;
  }

  async remove(id: number): Promise<void> {
    const result = await this.niveauModel.findByIdAndDelete( id).exec();
    
  }
}
