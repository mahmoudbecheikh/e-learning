import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com', // Utilisez votre hôte SMTP
        port: 587,
        auth: {
          user: 'chadhahannachi675@gmail.com',
          pass: 'ekwp skrg fxfh lnus',
        },
      },
      defaults: {
        from: 'chadhahanachi675@gmail.com',
      },
      
    //   template: {
    //     dir: join(__dirname, 'templates'),
    //     adapter: new HandlebarsAdapter(),
    //     options: {
    //       strict: true,
    //     },
    //   },
    }),
  ],
})
export class MailerConfigModule {}
