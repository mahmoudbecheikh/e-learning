import { Module } from '@nestjs/common';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';

@Module({
  controllers: [ProgressController],
  providers: [ProgressService],
  imports: [
    MongooseModule.forFeature(forFeatureDb),
  ],
  exports: [ProgressService]

})
export class ProgressModule {}
