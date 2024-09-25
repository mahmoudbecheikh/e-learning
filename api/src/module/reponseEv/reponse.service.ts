import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ReponseDto } from './dto/reponse.dto';
import { Reponse, ReponseDocument } from './model/reponse.models';
import { Evaluation, EvaluationDocument } from '../evaluation/model/evaluation.models';
import { User, UserDocument } from 'src/auth/schemas/user.schema';


@Injectable()
export class ReponsesService {

    constructor(
        @InjectModel(Reponse.name) private ReponseModel: Model<ReponseDocument>,
        @InjectModel(Evaluation.name) private EvaluationModel: Model<EvaluationDocument>,
        @InjectModel(User.name) private UserModel: Model<UserDocument>,

      ) {}

      async DeleteAll() {
        // Delete all reponses
        const deletedReponses = await this.ReponseModel.deleteMany({});

        // Update evaluations to remove references to deleted reponses
        await this.EvaluationModel.updateMany({}, { $set: { reponses: [] } });

        return deletedReponses;
    }

    Add(body: ReponseDto) {
        return this.ReponseModel.create(body);
      }
 
    FinAll(){
        return this.ReponseModel.find();
    }


    FindById(id : string){
        return this.ReponseModel.findOne({ _id: id});
    }


    Update(id: string, body: ReponseDto){
        return this.ReponseModel.findByIdAndUpdate(
            { _id: id },
            { $set: body },
            { new: true },
        );
    }
    async Delete(id: string) {
      const deletedReponse = await this.ReponseModel.findByIdAndDelete(id);
  
      if (!deletedReponse) {
        throw new NotFoundException('Reponse not found');
      }
  
      // Remove the reponse from all evaluationx
      await this.EvaluationModel.updateMany(
        { reponses: id },
        { $pull: { reponses: id } }
      );
  
      return deletedReponse;
    }

    // async addReponseToEvaluation(evaluationId: string, reponseDto: ReponseDto): Promise<Reponse> {
    //   const evaluation = await this.EvaluationModel.findById(evaluationId);
    //   if (!evaluation) {
    //     throw new NotFoundException('Evaluation non trouvé');
    //   }
    
    //   // Créer une nouvelle évaluation
    //   const createdReponse = await this.ReponseModel.create(reponseDto);
    
    //   // Ajouter l'ID de l'évaluation créée au tableau des évaluations du evaluation
    //   evaluation.reponses.push(createdReponse.id);
      
    //   // Sauvegarder les modifications du evaluation
    //   await evaluation.save();
    
    //   return createdReponse;
    // }



 async addReponseToEvaluation(evaluationId: string, reponseDto: ReponseDto, user: User): Promise<Reponse> {
      const evaluation = await this.EvaluationModel.findById(evaluationId);
      if (!evaluation) {
        throw new NotFoundException('Evaluation non trouvé');
      }
    
      // Créer une nouvelle évaluation
      const createdReponse = new this.ReponseModel( {...reponseDto,evaluationId:evaluation._id, userId:user._id});
    
      // Sauvegarder la réponse
  await createdReponse.save();

      // Ajouter l'ID de l'évaluation créée au tableau des évaluations du evaluation
      evaluation.reponses.push(createdReponse.id);
      
      // Sauvegarder les modifications du evaluation
      await evaluation.save();
    
      return createdReponse;
    }



    // async addReponseToEvaluation(evaluationId: string, responseContent: ReponseDto, user: User): Promise<Reponse> {
    //   console.log('Evaluation ID:', evaluationId);
    //   console.log('User ID:', user._id);
    
    //   // Vérifiez l'évaluation
    //   const evaluation = await this.EvaluationModel.findById(evaluationId).exec();
    //   if (!evaluation) {
    //     throw new NotFoundException('Evaluation not found');
    //   }
    
    //   // Vérifiez l'utilisateur
    //   const userDoc = await this.UserModel.findById(user._id).exec();
    //   if (!userDoc) {
    //     throw new NotFoundException('User not found');
    //   }
    
    //   // Créez et sauvegardez la réponse
    //   const newReponse = new this.ReponseModel({
    //     text: responseContent.text,
    //     evaluationId: evaluation._id,
    //     userId: userDoc._id,
    //   });
    //   await newReponse.save();
    
     
    //   evaluation.reponses.push(newReponse.id);
    //   await evaluation.save();
    
      
    //   userDoc.reponses.push(newReponse.id);
    //   await userDoc.save();
    
    //   return newReponse;
    // }
    
    
    
  //   async getReponsesByEvaluationAndUser(evaluationId: string, userId: string) {
  //     const reponses = await this.ReponseModel.find({
  //         evaluationId: new Types.ObjectId(evaluationId),
  //         userId: new Types.ObjectId(userId),
  //     }).exec();
  
  //     if (!reponses || reponses.length === 0) {
  //         throw new NotFoundException('Aucune réponse trouvée pour cette évaluation et cet utilisateur');
  //     }
  
  //     return reponses;
  // }



  async getReponsesByEvaluationAndUser(evaluationId: string, userId: string) {
    console.log(`Evaluation ID: ${evaluationId}, User ID: ${userId}`);
    
    if (!Types.ObjectId.isValid(evaluationId) || !Types.ObjectId.isValid(userId)) {
        throw new BadRequestException('Invalid ObjectId');
    }

    const reponse = await this.ReponseModel.findOne({
        evaluationId: new Types.ObjectId(evaluationId),
        userId: new Types.ObjectId(userId),
    }).exec();

    if (!reponse) {
        throw new NotFoundException('Aucune réponse trouvée pour cette évaluation et cet utilisateur');
    }

    return reponse;
}


 
     
async getReponsesByEvaluationandUser(evaluationId: string, userId: string) {
  const evaluation = await this.EvaluationModel.findById(evaluationId)
    .populate({
      path: 'reponses',
      match: { userId: userId } // Filtrer les réponses pour l'utilisateur connecté
    })
    .exec();
  if (!evaluation) {
    throw new NotFoundException('Evaluation non trouvée');
  }
  return evaluation.reponses;
}
 

async getReponsesByUser(userId: string) {
  console.log(`Fetching responses for userId: ${userId}`);
  
  if (!Types.ObjectId.isValid(userId)) {
    console.log(`Invalid ObjectId: ${userId}`);
    throw new NotFoundException('Identifiant utilisateur invalide');
  }
  
  const reponses = await this.ReponseModel.find({ userId: new Types.ObjectId(userId) }).exec();
  console.log(`Found responses: ${JSON.stringify(reponses)}`);
  
  if (!reponses || reponses.length === 0) {
    throw new NotFoundException('Aucune réponse trouvée pour cet utilisateur');
  }
  return reponses;
}



 

      
    
      async getReponsesByEvaluation(evaluationId: string) {
        const evaluation = await this.EvaluationModel.findById(evaluationId).populate('reponses').exec();
        if (!evaluation) {
          throw new NotFoundException('Evaluation non trouvée');
        }
        return evaluation.reponses;
      }
     
}

