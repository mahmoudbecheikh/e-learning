import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormationService } from './formation.service';
import { FormationController } from './formation.controller';
import { Formation, FormationSchema } from './schemas/formation.schema';
import { AuthModule } from '../auth/auth.module';
import { NiveauModule } from 'src/niveau/niveau.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Formation.name, schema: FormationSchema },
    ]),
    AuthModule,
    NiveauModule,
  ],
  providers: [FormationService],
  controllers: [FormationController],
})
export class FormationModule {}
