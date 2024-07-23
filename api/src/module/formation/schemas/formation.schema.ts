
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, HydratedDocument, Types } from 'mongoose';
import { Message, MessageSchema } from 'src/module/message/entities/message.entity';
import { Niveau, NiveauSchema } from 'src/module/niveau/schemas/niveau.schema';

export type FormationDocument = HydratedDocument<Formation>;

@Schema()
<<<<<<< HEAD
export class Formation {
  @Prop({ required: true })
  formationId: string;
=======
export class Formation extends Document {
  /*@Prop({ required: true })
  formationId: string;*/
>>>>>>> 58531d352d973382d3660ac7002f9a0f19050a7c

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

<<<<<<< HEAD
  @Prop({ type: [NiveauSchema], default: [] })
  niveaux: Types.DocumentArray<Niveau>;

  @Prop({ type: [MessageSchema], default: [] })
  forums: Types.DocumentArray<Message>;
=======
  @Prop({ type: [Types.ObjectId], ref: 'Niveau', required: true })
  niveau: Niveau[];
>>>>>>> 58531d352d973382d3660ac7002f9a0f19050a7c
}

export const FormationSchema = SchemaFactory.createForClass(Formation);
