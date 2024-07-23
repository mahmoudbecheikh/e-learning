import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EvaluationsController } from './evaluation.controller';
import { EvaluationsService } from './evaluation.service';
import { Evaluation, EvaluationSchema } from './model/evaluation.models';
import { Cours, CoursSchema } from '../cours/entities/cours.entity';

@Module({
  imports : [  MongooseModule.forFeature([
    { name: Evaluation.name, schema: EvaluationSchema },
    { name: Cours.name, schema: CoursSchema },
  ]),
  
  
],
  controllers: [EvaluationsController],
  providers: [EvaluationsService ]
})
export class EvaluationsModule {}
