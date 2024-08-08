
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document, HydratedDocument, ObjectId, Types } from 'mongoose';
import { User, UserSchema } from 'src/auth/schemas/user.schema';
import { Message, MessageSchema } from 'src/module/message/entities/message.entity';
import { Niveau, NiveauSchema } from 'src/module/niveau/schemas/niveau.schema';

export type FormationDocument = HydratedDocument<Formation>;

@Schema()
export class Formation {

  _id: ObjectId;

  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  objectif: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  competenceAquises: string;

  @Prop({ required: true })
  resultatSouhaites: string;

  @Prop({ required: true })
  nbrNiveau: number;

  @Prop({ type: [UserSchema], default: [] })
  users: Types.DocumentArray<User>;

  @Prop({ type: [MessageSchema], default: [] })
  forums: Types.DocumentArray<Message>;
  
  @Prop({ type: [Types.ObjectId], ref: 'Niveau', required: true })
  niveau: Niveau[];
}

export const FormationSchema = SchemaFactory.createForClass(Formation);
