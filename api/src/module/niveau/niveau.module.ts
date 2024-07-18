import { Module } from '@nestjs/common';
import { NiveauController } from './niveau.controller';
import { NiveauService } from './niveau.service';
import { Niveau, NiveauSchema } from './schemas/niveau.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Niveau.name, schema: NiveauSchema }]),
   
  ],
  controllers: [NiveauController],
  providers: [NiveauService],
  exports: [MongooseModule],
})
export class NiveauModule {}
