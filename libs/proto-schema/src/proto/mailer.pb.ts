/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'mailer';

export interface SendEmailRequest {
  email: string;
}

export interface SendEmailResponse {
  sessionId: string;
}

export interface VerifyEmailRequest {
  otp: string;
  sessionId: string;
}

export interface VerifyEmailResponse {
  success: boolean;
}

export const MAILER_PACKAGE_NAME = 'mailer';

export interface MailerServiceClient {
  sendEmail(
    request: SendEmailRequest,
    metadata?: Metadata,
  ): Observable<SendEmailResponse>;

  verifyEmail(
    request: VerifyEmailRequest,
    metadata?: Metadata,
  ): Observable<VerifyEmailResponse>;
}

export interface MailerServiceController {
  sendEmail(
    request: SendEmailRequest,
    metadata?: Metadata,
  ):
    | Promise<SendEmailResponse>
    | Observable<SendEmailResponse>
    | SendEmailResponse;

  verifyEmail(
    request: VerifyEmailRequest,
    metadata?: Metadata,
  ):
    | Promise<VerifyEmailResponse>
    | Observable<VerifyEmailResponse>
    | VerifyEmailResponse;
}

export function MailerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['sendEmail', 'verifyEmail'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MailerService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('MailerService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MAILER_SERVICE_NAME = 'MailerService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
