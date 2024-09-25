import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document ,Schema as MongooseSchema, Types} from "mongoose";


export enum typeEvaluation {
  Paragraph = 'paragraph',
  Shortresponse = 'shortresponse'
  }

export type EvaluationDocument = Evaluation & Document;
export type QuizzDocument = Quizz & Document;

@Schema()
export class Evaluation {
 
    @Prop()
    titre: string;

    @Prop()
    description: string;

    @Prop()
    question: string;

    @Prop()
    type: typeEvaluation;

    @Prop()
    niveauId: string;
  
    @Prop()
    userId: string;
  
    @Prop()
    score: number;

    @Prop()
    isValidated: boolean;

    @Prop({ type: [Types.ObjectId], ref: 'Reponse' }) // Assurer que c'est un tableau d'ObjectId
  reponses: Types.ObjectId[];

    

}

export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);


@Schema()
export class Quizz extends Evaluation {
  @Prop()
  option1: string;

  @Prop()
  option2: string;

  @Prop()
  option3: string;

  @Prop()
  option4: string;

  @Prop()
  correctOption: string;

  @Prop({ type: [{ userId: String, selectedOption: String }], _id: false })
  userResponses: { userId: string; selectedOption: string }[];
}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);
