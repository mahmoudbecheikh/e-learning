import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EvaluationsController } from './evaluation.controller';
import { EvaluationsService } from './evaluation.service';
import { Evaluation, EvaluationSchema, Quizz, QuizzSchema } from './model/evaluation.models';
import { Niveau, NiveauSchema } from '../niveau/schemas/niveau.schema';
import { QuizzController } from './quizz.controller';
import { QuizzService } from './quizz.service';
import { Reponse, ReponseSchema } from '../reponseEv/model/reponse.models';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports : [  MongooseModule.forFeature([
    { name: Quizz.name, schema: QuizzSchema },
    { name: Evaluation.name, schema: EvaluationSchema },
    { name: Niveau.name, schema: NiveauSchema },
    { name: Reponse.name, schema: ReponseSchema },
    { name: User.name, schema: UserSchema },

  ]),
  
  
],
  controllers: [
    EvaluationsController,
    QuizzController
  ],
  providers: [
    EvaluationsService,
    QuizzService
   ]
})
export class EvaluationsModule {}
