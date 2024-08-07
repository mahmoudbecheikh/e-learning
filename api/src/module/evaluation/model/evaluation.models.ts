import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document ,Schema as MongooseSchema} from "mongoose";


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
}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);
