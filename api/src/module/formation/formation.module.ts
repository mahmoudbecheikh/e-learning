import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { Formation, FormationSchema } from './schemas/formation.schema';
import { AuthModule } from '../../auth/auth.module';
import { NiveauModule } from '../niveau/niveau.module';
import { CoursModule } from '../cours/cours.module';
import { ProgressModule } from '../progress/progress.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Formation.name, schema: FormationSchema }]),
    AuthModule,
    forwardRef(() => NiveauModule),
    CoursModule ,
    ProgressModule // Use forwardRef to resolve circular dependency
  ],
  providers: [FormationService],
  controllers: [FormationController],
  exports: [FormationService, MongooseModule.forFeature([{ name: Formation.name, schema: FormationSchema }])],  // Export FormationService if needed in other modules
})
export class FormationModule {}
