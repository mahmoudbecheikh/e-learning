import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document ,Schema as MongooseSchema} from "mongoose";


export enum typeEvaluation {
    PARAGRAPH = 'Paragraph',
    SHORTRESPONSE = 'Shortresponse'
  }

export type EvaluationDocument = Evaluation & Document;

@Schema()
export class Evaluation {
 
    @Prop({ required: true })
    titre: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    question: string;

    @Prop({ required: true })
    type: typeEvaluation;

    @Prop({ required: true })
    courseId: string;
  
    @Prop({ required: true })
    userId: string;
  
    @Prop({ required: true })
    score: number;
  
    @Prop({ required: true })
    maxScore: number;

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
}

export const QuizzSchema = SchemaFactory.createForClass(Quizz);
