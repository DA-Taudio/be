/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'sms';

export interface SendOtpRequest {
  phoneNumber: string;
}

export interface SendOtpResponse {
  phoneNumber: string;
  sessionId: string;
  otpExpiredTime: number;
}

export interface ConfirmOtpRequest {
  sessionId: string;
  otp: string;
}

export interface ConfirmOtpResponse {
  confirmed: boolean;
}

export interface GetPhoneNumberRequest {
  sessionId: string;
}

export interface GetPhoneNumberResponse {
  phoneNumber: string;
}

export const SMS_PACKAGE_NAME = 'sms';

export interface SmsServiceClient {
  sendOtp(
    request: SendOtpRequest,
    metadata?: Metadata,
  ): Observable<SendOtpResponse>;

  confirmOtp(
    request: ConfirmOtpRequest,
    metadata?: Metadata,
  ): Observable<ConfirmOtpResponse>;

  getPhoneNumber(
    request: GetPhoneNumberRequest,
    metadata?: Metadata,
  ): Observable<GetPhoneNumberResponse>;

  inValidOtp(
    request: ConfirmOtpRequest,
    metadata?: Metadata,
  ): Observable<ConfirmOtpResponse>;
}

export interface SmsServiceController {
  sendOtp(
    request: SendOtpRequest,
    metadata?: Metadata,
  ): Promise<SendOtpResponse> | Observable<SendOtpResponse> | SendOtpResponse;

  confirmOtp(
    request: ConfirmOtpRequest,
    metadata?: Metadata,
  ):
    | Promise<ConfirmOtpResponse>
    | Observable<ConfirmOtpResponse>
    | ConfirmOtpResponse;

  getPhoneNumber(
    request: GetPhoneNumberRequest,
    metadata?: Metadata,
  ):
    | Promise<GetPhoneNumberResponse>
    | Observable<GetPhoneNumberResponse>
    | GetPhoneNumberResponse;

  inValidOtp(
    request: ConfirmOtpRequest,
    metadata?: Metadata,
  ):
    | Promise<ConfirmOtpResponse>
    | Observable<ConfirmOtpResponse>
    | ConfirmOtpResponse;
}

export function SmsServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'sendOtp',
      'confirmOtp',
      'getPhoneNumber',
      'inValidOtp',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('SmsService', method)(
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
      GrpcStreamMethod('SmsService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const SMS_SERVICE_NAME = 'SmsService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
