
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, Types } from 'mongoose';
import { Niveau, NiveauSchema } from 'src/niveau/schemas/niveau.schema';

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

  @Prop({ type: [NiveauSchema], default: [] })
  niveaux: Types.DocumentArray<Niveau>;
}

export const FormationSchema = SchemaFactory.createForClass(Formation);
