import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FormationModule } from './formation/formation.module';
import { DatabaseService } from './database.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    FormationModule,
  ],
  providers: [DatabaseService],
})
export class AppModule {
  constructor(private configService: ConfigService) {
    const mongoUri = this.configService.get<string>('MONGODB_URI');
    console.log(`Connecting to MongoDB with URI: ${mongoUri}`);
  }
}
