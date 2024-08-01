import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';
import { Cours } from 'src/module/cours/entities/cours.entity';
import { Formation } from 'src/module/formation/schemas/formation.schema';

const AutoIncrement = AutoIncrementFactory(mongoose);

@Schema()
export class Niveau extends Document {
  

  @Prop({ required: true })
  title: string;

  @Prop({type:Types.ObjectId, ref:'Formation'})
  formation:Formation[];

  @Prop({type:[Types.ObjectId], ref:'Cours',required:true})
  cours:Cours[];
}

export const NiveauSchema = SchemaFactory.createForClass(Niveau);

// Apply auto-increment plugin to the schema
//NiveauSchema.plugin(AutoIncrement, { inc_field: 'niveauId' });
