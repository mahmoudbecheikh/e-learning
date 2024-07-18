import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.on('connected', 
      () => {
      
      console.log('Database connection successful');
    });
    this.connection.on('error', (err) => {
      console.error(`Database connection error: ${err}`);
    });
  }
}
