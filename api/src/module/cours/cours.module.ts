import { Module } from '@nestjs/common';
import { CoursService } from './cours.service';
import { CoursController } from './cours.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from '../../utils/multer.config';

@Module({
  controllers: [CoursController],
  providers: [CoursService],
  imports: [
    MulterModule.register(multerOptions),
    MongooseModule.forFeature(forFeatureDb),
  ],
})
export class CoursModule {}
