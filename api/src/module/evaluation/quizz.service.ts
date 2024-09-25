import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Quizz, QuizzDocument } from './model/evaluation.models';
import { QuizzDto } from './dto/quizz.dto';
import { Niveau, NiveauDocument } from '../niveau/schemas/niveau.schema';
import { Reponse, ReponseDocument } from '../reponseEv/model/reponse.models';

@Injectable()
export class QuizzService {
  constructor(
    @InjectModel(Quizz.name) private readonly quizzModel: Model<QuizzDocument>,
    @InjectModel(Niveau.name) private NiveauModel: Model<NiveauDocument>,
    @InjectModel(Reponse.name) private readonly reponseModel: Model<ReponseDocument>,


  ) {}

  async createQuizz(createQuizzDto: QuizzDto): Promise<Quizz> {
    const createdQuizz = new this.quizzModel(createQuizzDto);
    return createdQuizz.save();
  }

  async findAllQuizz(): Promise<Quizz[]> {
    return this.quizzModel.find().exec();
  }

  async findQuizzById(id: string): Promise<Quizz> {
    const quizz = await this.quizzModel.findById(id).exec();
    if (!quizz) {
      throw new NotFoundException(`Quizz with id ${id} not found`);
    }
    return quizz;
  }

  async updateQuizz(id: string, createQuizzDto: QuizzDto): Promise<Quizz> {
    const updatedQuizz = await this.quizzModel
      .findByIdAndUpdate(id, createQuizzDto, { new: true })
      .exec();
    if (!updatedQuizz) {
      throw new NotFoundException(`Quizz with id ${id} not found`);
    }
    return updatedQuizz;
  }

  async removeQuizz(id: string): Promise<void> {
    const result = await this.quizzModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Quizz with id ${id} not found`);
    }
  }

  async Delete(id: string) {
    const deletedQuizz = await this.quizzModel.findByIdAndDelete(id);

    if (!deletedQuizz) {
      throw new NotFoundException('Quizz not found');
    }

    // Remove the evaluation from all niveaux
    await this.NiveauModel.updateMany(
      { quizzs: id },
      { $pull: { quizzs: id } }
    );

    return deletedQuizz;
  }

  // async addQuizzToNiveau(niveauId: string, createQuizzDto: QuizzDto): Promise<Quizz> {
  //   const niveau = await this.NiveauModel.findById(niveauId);
  //   if (!niveau) {
  //     throw new NotFoundException('Niveau non trouvé');
  //   }
  
  //   // Créer une nouvelle évaluation
  //   const createdQuizz= await this.quizzModel.create(createQuizzDto);
  
  //   // Ajouter l'ID de l'évaluation créée au tableau des évaluations du niveau
  //   niveau.evaluations.push(createdQuizz.id);
    
  //   // Sauvegarder les modifications du niveau
  //   await niveau.save();
  
  //   return createdQuizz;
  // }
  

  async addQuizzToNiveau(niveauId: string, createQuizzDto: QuizzDto): Promise<Quizz> {
    const niveau = await this.NiveauModel.findById(niveauId);
    if (!niveau) {
      throw new NotFoundException('Niveau non trouvé');
    }
  
    // Créer une nouvelle évaluation de type quizz
    const createdQuizz = await this.quizzModel.create(createQuizzDto);
  
    // Ajouter l'ID de l'évaluation créée au tableau des quizzs du niveau
    niveau.quizzs.push(createdQuizz.id);
  
    // Sauvegarder les modifications du niveau
    await niveau.save();
  
    return createdQuizz;
  }

    
  
    async getQuizzByNiveau(niveauId: string) {
      const niveau = await this.NiveauModel.findById(niveauId).populate('quizzs').exec();
      if (!niveau) {
        throw new NotFoundException('Niveau non trouvée');
      }
      return niveau.quizzs;
    }


    // async submitQuizzResponse(quizzId: string, userId: string, selectedOption: string): Promise<{ isCorrect: boolean }> {
    //   const quizz = await this.quizzModel.findById(quizzId);
    //   if (!quizz) {
    //     throw new NotFoundException('Quizz non trouvé');
    //   }
  
    //   // Vérification si l'utilisateur a déjà répondu
    //   const existingResponse = quizz.userResponses.find(response => response.userId === userId);
    //   if (existingResponse) {
    //     throw new BadRequestException('Vous avez déjà répondu à ce quiz.');
    //   }
  
    //   // Ajouter la réponse de l'utilisateur
    //   quizz.userResponses.push({ userId, selectedOption });
    //   await quizz.save();
  
    //   // Vérifier si la réponse est correcte
    //   const isCorrect = quizz.correctOption === selectedOption;
    //   return { isCorrect };
    // }


    async saveQuizResponse(quizId: string, userId: string, selectedOption: string): Promise<any> {
      const quizz = await this.quizzModel.findById(quizId).exec();
      
      if (!quizz) {
        throw new NotFoundException(`Quizz with id ${quizId} not found`);
      }
      
      const isCorrect = quizz.correctOption === selectedOption;
    
      const newResponse = new this.reponseModel({
        text: selectedOption,
        quizId: quizId,
        userId: userId,
        isCorrect: isCorrect
      });
    
      await newResponse.save();

      quizz.reponses.push(newResponse.id);
      
      // Sauvegarder les modifications du evaluation
      await quizz.save();
    
      return {
        message: isCorrect ? 'Réponse correcte' : 'Réponse fausse',
        isCorrect: isCorrect,
      };
    }
    


    


    // async saveQuizResponse(quizId: string, user: User, selectedOption: string): Promise<Reponse> {
    //   const quizz = await this.quizzModel.findById(quizId).exec();
      
    //   if (!quizz) {
    //     throw new NotFoundException(`Quizz with id ${quizId} not found`);
    //   }
      
    //   const isCorrect = quizz.correctOption === selectedOption;
    
    //   const newResponse = new this.reponseModel({
    //     text: selectedOption,
    //     quizId: quizz._id,
    //     userId: user._id,
    //     isCorrect: isCorrect
    //   });
    
    //   await newResponse.save();
    
    //   quizz.reponses.push(newResponse.id);
      
    //   // Sauvegarder les modifications du evaluation
    //   await quizz.save();

    //   return newResponse;
    // }


}
