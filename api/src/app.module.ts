import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // Import du module ConfigModule
import { MongooseModule } from '@nestjs/mongoose'; // Import du module MongooseModule
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_URI,{dbName:'E-learning'}),
  AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
