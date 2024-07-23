import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Client, User } from 'src/auth/schemas/user.schema';
import { Formation } from 'src/module/formation/schemas/formation.schema';
import { Forum } from './forum.entity';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message  {
    @Prop({ required: true })
    contenu: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Client' })
    user: Client;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Forum' })
    forum: Forum;

    @Prop()
    date: string;

}

export const MessageSchema = SchemaFactory.createForClass(Message);
