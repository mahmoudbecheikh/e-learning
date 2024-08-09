import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EvaluationDto } from './dto/evaluation.dto';
import { Evaluation, EvaluationDocument } from './model/evaluation.models';
import { Niveau, NiveauDocument } from '../niveau/schemas/niveau.schema';


@Injectable()
export class EvaluationsService {

    constructor(
        @InjectModel(Evaluation.name) private EvaluationModel: Model<EvaluationDocument>,
        @InjectModel(Niveau.name) private NiveauModel: Model<NiveauDocument>,

      ) {}

      async DeleteAll() {
        // Delete all evaluations
        const deletedEvaluations = await this.EvaluationModel.deleteMany({});

        // Update niveaus to remove references to deleted evaluations
        await this.NiveauModel.updateMany({}, { $set: { evaluations: [] } });

        return deletedEvaluations;
    }

    Add(body: EvaluationDto) {
        return this.EvaluationModel.create(body);
      }
 
    FinAll(){
        return this.EvaluationModel.find();
    }


    FindById(id : string){
        return this.EvaluationModel.findOne({ _id: id});
    }


    Update(id: string, body: EvaluationDto){
        return this.EvaluationModel.findByIdAndUpdate(
            { _id: id },
            { $set: body },
            { new: true },
        );
    }


    // async Delete(id: string) {
    //     const deletedEvaluation = await this.EvaluationModel.deleteOne({ _id: id });
    
    //     const niveau = await this.NiveauModel.findOne({ evaluations: id });
    //     if (niveau) {
    //         niveau.evaluations = niveau.evaluations.filter(evaluationId => evaluationId.toString() !== id);
    //         await niveau.save();
    //     }
    
    //     return deletedEvaluation;
    // }

    
    async Delete(id: string) {
      const deletedEvaluation = await this.EvaluationModel.findByIdAndDelete(id);
  
      if (!deletedEvaluation) {
        throw new NotFoundException('Evaluation not found');
      }
  
      // Remove the evaluation from all niveaux
      await this.NiveauModel.updateMany(
        { evaluations: id },
        { $pull: { evaluations: id } }
      );
  
      return deletedEvaluation;
    }


    // async Delete(id: string) {
    //   // Step 1: Find and delete the evaluation
    //   const deletedEvaluation = await this.EvaluationModel.findByIdAndDelete(id);
    //   if (!deletedEvaluation) {
    //     throw new NotFoundException('Evaluation not found');
    //   }
  
    //   // Step 2: Find all niveaux containing this evaluation and remove the reference
    //   const niveaux = await this.NiveauModel.find({ evaluations: id });
    //   for (const niveau of niveaux) {
    //     niveau.evaluations = niveau.evaluations.filter(evaluationId => evaluationId.toString() !== id);
    //     await niveau.save();
    //   }
  
    //   return deletedEvaluation;
    // }


  
    // async addEvaluationToNiveau(niveauId: string, evaluationDto: EvaluationDto): Promise<Evaluation> {
    //     const niveau = await this.NiveauModel.findById(niveauId);
    //     if (!niveau) {
    //       throw new NotFoundException('niveau non trouvée');
    //     }
      
    //     const createdEvaluation = await this.EvaluationModel.create(evaluationDto);
    //     niveau.evaluations.push(createdEvaluation);
    //     await niveau.save();
    //     return createdEvaluation;
    //   }

    async addEvaluationToNiveau(niveauId: string, evaluationDto: EvaluationDto): Promise<Evaluation> {
      const niveau = await this.NiveauModel.findById(niveauId);
      if (!niveau) {
        throw new NotFoundException('Niveau non trouvé');
      }
    
      // Créer une nouvelle évaluation
      const createdEvaluation = await this.EvaluationModel.create(evaluationDto);
    
      // Ajouter l'ID de l'évaluation créée au tableau des évaluations du niveau
      niveau.evaluations.push(createdEvaluation.id);
      
      // Sauvegarder les modifications du niveau
      await niveau.save();
    
      return createdEvaluation;
    }
    

      
    
      async getEvaluationsByNiveau(niveauId: string) {
        const niveau = await this.NiveauModel.findById(niveauId).populate('evaluations').exec();
        if (!niveau) {
          throw new NotFoundException('Niveau non trouvée');
        }
        return niveau.evaluations;
      }
    
}

