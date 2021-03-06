require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        // auth: {
        //   user: process.env.EMAIL_ID, // generated ethereal user
        //   pass: process.env.EMAIL_PASS, // generated ethereal password
        // },
        auth: {
          type: 'OAuth2',
          user: process.env.OAUTH_EMAIL_ID,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: process.env.ACCESS_TOKEN,
        },
      },
      defaults: {
        // from: process.env.EMAIL_ID, // outgoing email ID
        from: process.env.OAUTH_EMAIL_ID,
      },
      preview: true,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
