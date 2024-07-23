import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EvaluationDto } from './dto/evaluation.dto';
import { Evaluation, EvaluationDocument } from './model/evaluation.models';
import { Cours, CoursDocument } from '../cours/entities/cours.entity';


@Injectable()
export class EvaluationsService {

    constructor(
        @InjectModel(Evaluation.name) private EvaluationModel: Model<EvaluationDocument>,
        @InjectModel(Cours.name) private CoursModel: Model<CoursDocument>,
      
      ) {}

      async DeleteAll() {
        // Delete all evaluations
        const deletedEvaluations = await this.EvaluationModel.deleteMany({});

        // Update courss to remove references to deleted evaluations
        await this.CoursModel.updateMany({}, { $set: { evaluations: [] } });

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


    async Delete(id: string) {
        // Supprimer la réponse
        const deletedEvaluation = await this.EvaluationModel.deleteOne({ _id: id });
    
        // Mettre à jour la réclamation associée
        const cours = await this.CoursModel.findOne({ evaluations: id });
        if (cours) {
            cours.evaluations = cours.evaluations.filter(evaluationId => evaluationId.toString() !== id);
            await cours.save();
        }
    
        return deletedEvaluation;
    }


    Search(){
        return 'search claim'
    }

  
    async addEvaluationToCours(coursId: string, evaluationDto: EvaluationDto): Promise<Evaluation> {
        const cours = await this.CoursModel.findById(coursId).populate('user');
        if (!cours) {
          throw new NotFoundException('Réclamation non trouvée');
        }
      
        const createdEvaluation = await this.EvaluationModel.create(evaluationDto);
        cours.evaluations.push(createdEvaluation);
        await cours.save();
      
        return createdEvaluation;
      }
      



}

