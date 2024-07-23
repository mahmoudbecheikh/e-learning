import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client, User } from 'src/auth/schemas/user.schema';
import { Formation } from 'src/module/formation/schemas/formation.schema';
import { Message, MessageSchema } from './message.entity';

export type ForumDocument = HydratedDocument<Forum>;

@Schema()
export class Forum {


    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client' })
    user: Client;

    @Prop({default: [] })
    messages: Types.DocumentArray<Message>;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Formation' })
    formation: Formation;
}

export const ForumSchema = SchemaFactory.createForClass(Forum);
