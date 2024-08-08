
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Cours } from 'src/module/cours/entities/cours.entity';
import { Formation } from 'src/module/formation/schemas/formation.schema';
import { Niveau } from 'src/module/niveau/schemas/niveau.schema';

export type ProgressDocument = HydratedDocument<Progress>;

@Schema()
export class Progress {

z
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Formation' })
    formation: Formation;

    @Prop({type:Types.ObjectId, ref:'Niveau', })
    niveauActually : Niveau

    @Prop({type:[Types.ObjectId], ref:'Niveau', default:[]})
    completedNiveau:any[];

    @Prop({type:[Types.ObjectId], ref:'Cours', default:[]})
    completedCours:Cours[] ;
    

    @Prop({type:Boolean , default : false})
    finish:boolean ;


}

export const ProgressSchema = SchemaFactory.createForClass(Progress);
