import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import * as AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

@Schema()
export class Niveau extends Document {
  /*@Prop()
  niveauId: number;*/

  @Prop({ required: true })
  title: string;
}

export const NiveauSchema = SchemaFactory.createForClass(Niveau);

// Apply auto-increment plugin to the schema
//NiveauSchema.plugin(AutoIncrement, { inc_field: 'niveauId' });
