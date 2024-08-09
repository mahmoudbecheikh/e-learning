import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EvaluationsController } from './evaluation.controller';
import { EvaluationsService } from './evaluation.service';
import { Evaluation, EvaluationSchema, Quizz, QuizzSchema } from './model/evaluation.models';
import { Niveau, NiveauSchema } from '../niveau/schemas/niveau.schema';
import { QuizzController } from './quizz.controller';
import { QuizzService } from './quizz.service';

@Module({
  imports : [  MongooseModule.forFeature([
    { name: Quizz.name, schema: QuizzSchema },
    { name: Evaluation.name, schema: EvaluationSchema },
    { name: Niveau.name, schema: NiveauSchema },
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
