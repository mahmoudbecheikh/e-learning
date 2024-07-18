import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CoursDocument = HydratedDocument<Cours>;
@Schema()
export class File {
  @Prop({ required: true })
  originalname: string;

  @Prop({ required: true })
  filename: string;

  @Prop({ required: true })
  path: string;

  @Prop({ required: true })
  mimetype: string;

  @Prop({ required: true })
  size: number;
}

const FileSchema = SchemaFactory.createForClass(File);

@Schema()
export class Cours {
  @Prop({ required: true })
  nom: string;

  @Prop({ type: FileSchema, required: false })
  video: File;

  @Prop()
  files: File[];

  @Prop()
  description: string;

  @Prop()
  dateCreation: string;
}

export const CoursSchema = SchemaFactory.createForClass(Cours);
