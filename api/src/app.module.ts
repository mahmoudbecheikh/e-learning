import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'; // Import du module ConfigModule
import { MongooseModule } from '@nestjs/mongoose'; // Import du module MongooseModule
import { AuthModule } from './auth/auth.module';
import { CoursModule } from './module/cours/cours.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FormationModule } from './module/formation/formation.module';
import { NiveauModule } from './module/niveau/niveau.module';
import { MailerConfigModule } from './auth/mailer.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.DB_URI, { dbName: 'E-learning' }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads',
  }),
    AuthModule,
    CoursModule,
    FormationModule,
    NiveauModule,
    MailerConfigModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }