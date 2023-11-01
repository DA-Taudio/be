import { Controller } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { GrpcMethod } from '@nestjs/microservices';
import {
  MAILER_SERVICE_NAME,
  SendEmailRequest,
  VerifyEmailRequest,
} from '@app/proto-schema/proto/mailer.pb';
import { Metadata } from '@grpc/grpc-js';
import { AppMetadata } from '@app/core';

@Controller()
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private readonly appMetadata: AppMetadata,
  ) {}

  @GrpcMethod(MAILER_SERVICE_NAME, 'SendEmail')
  sendEmail(request: SendEmailRequest, metadata: Metadata) {
    return this.mailerService.sendEmail(request);
  }
  @GrpcMethod(MAILER_SERVICE_NAME, 'VerifyEmail')
  verifyEmail(request: VerifyEmailRequest, metadata: Metadata) {
    return this.mailerService.verifyEmail(
      request,
      this.appMetadata.getUserId(metadata),
    );
  }
}
