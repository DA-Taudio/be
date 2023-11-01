import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MAIL_QUEUE } from '../constants/mail.constant';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { MailProcessor } from './mailer.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpRepository } from './otp.repository';
import { AppMetadata, OtpEntity, UserEntity } from '@app/core';
import { UserRepository } from './users.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OtpRepository,
      OtpEntity,
      UserRepository,
      UserEntity,
    ]),
    BullModule.registerQueue({
      name: MAIL_QUEUE,
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService, MailProcessor, AppMetadata],
})
export class MailModule {}
