import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { Formation, FormationSchema } from './schemas/formation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Formation.name, schema: FormationSchema }]),
  ],
  providers: [FormationService],
  controllers: [FormationController],
})
export class FormationModule {}
