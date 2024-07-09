
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

@Schema()
export class Formation extends Document {
  @Prop({ required: true })
  formationId: string;

  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  objectif: string;

  @Prop({ required: true })
  description: string;

  @Prop({required:true})
  competenceAquises:string;

  @Prop({required:true})
  resultatSouhaites:string;

  @Prop({required:true})
  nbrNiveau:number;
}

export const FormationSchema = SchemaFactory.createForClass(Formation);
