import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReponsesController } from './reponse.controller';
import { ReponsesService } from './reponse.service';
import { Reponse, ReponseSchema } from './model/reponse.models';
import { Evaluation, EvaluationSchema } from '../evaluation/model/evaluation.models';
import { User, UserSchema } from 'src/auth/schemas/user.schema';


@Module({
  imports : [  MongooseModule.forFeature([
    { name: Reponse.name, schema: ReponseSchema },
    { name: Evaluation.name, schema: EvaluationSchema },
    { name: User.name, schema: UserSchema },

  ]),
  
  
],
  controllers: [
    ReponsesController
  ],
  providers: [
    ReponsesService   
]
})
export class ReponsesModule {}
 