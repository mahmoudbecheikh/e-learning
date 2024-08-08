import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Cours } from 'src/module/cours/entities/cours.entity';
import { Formation } from 'src/module/formation/schemas/formation.schema';
import { Evaluation } from 'src/module/evaluation/model/evaluation.models';

const AutoIncrement = AutoIncrementFactory(mongoose);

export type NiveauDocument = Niveau & Document;

@Schema()
export class Niveau extends Document {
  
  @Prop({ required: true })
  title: string;

 
  @Prop({
    required: true
        //formationId: { type: Types.ObjectId, ref: 'Formation', required: true },
       
      
    
  })
  formationTitle: string
  
    
 

  @Prop({type:[Types.ObjectId], ref:'Cours',required:true})
  cours:Cours[];

  // @Prop({ type: [Types.ObjectId] })
  // evaluations: Evaluation[];

  @Prop({ type: [Types.ObjectId], ref: 'Evaluation' }) // Assurer que c'est un tableau d'ObjectId
  evaluations: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: 'Quizz' }) // Assurer que c'est un tableau d'ObjectId
  quizzs: Types.ObjectId[];
}

export const NiveauSchema = SchemaFactory.createForClass(Niveau);

// Apply auto-increment plugin to the schema
//NiveauSchema.plugin(AutoIncrement, { inc_field: 'niveauId' });
