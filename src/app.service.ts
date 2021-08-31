import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
require('dotenv').config();

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  public example(): void {
    console.log('sending mail');
    this.mailerService
      .sendMail({
        to: process.env.TEST_RECEIVER, // List of receivers email address
        from: process.env.EMAIL_ID, // Senders email address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(success => {
        console.log(success);
        console.log('sent');
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  public example2(): void {
    this.mailerService
      .sendMail({
        to: process.env.TEST_RECEIVER, // List of receivers email address
        from: process.env.EMAIL_ID, // Senders email address
        subject: 'Testing Nest Mailermodule with template ✔',
        template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }

  public example3(): void {
    this.mailerService
      .sendMail({
        to: process.env.TEST_RECEIVER,
        from: process.env.EMAIL_ID,
        subject: 'Testing Nest Mailermodule with template ✔',
        template: __dirname + '/index', // The `.pug` or `.hbs` extension is appended automatically.
        context: {
          // Data to be sent to template engine.
          code: 'cf1a3f828287',
          username: 'john doe',
        },
      })
      .then(success => {
        console.log(success);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
