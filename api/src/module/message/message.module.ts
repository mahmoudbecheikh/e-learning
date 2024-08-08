import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessagesGateway } from 'src/utils/messages.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import forFeatureDb from 'src/db/for-feature.db';


@Module({
  controllers: [MessageController],
  providers: [MessageService, MessagesGateway],
  imports: [
    MongooseModule.forFeature(forFeatureDb),
  ],
})
export class MessageModule { }
