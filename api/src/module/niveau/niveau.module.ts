import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NiveauController } from './niveau.controller';
import { NiveauService } from './niveau.service';
import { Niveau, NiveauSchema } from './schemas/niveau.schema';
import { FormationModule } from '../formation/formation.module';
import { CoursModule } from '../cours/cours.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Niveau.name, schema: NiveauSchema }]),
    forwardRef(() => FormationModule), 
    CoursModule
  ],
  controllers: [NiveauController],
  providers: [NiveauService],
  exports: [NiveauService, MongooseModule.forFeature([{ name: Niveau.name, schema: NiveauSchema }])],
})
export class NiveauModule {}
