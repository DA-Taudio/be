import { AppMetadata } from '@app/core';
import {
  ConfirmOtpRequest,
  GetPhoneNumberRequest,
  SMS_SERVICE_NAME,
  SendOtpRequest,
} from '@app/proto-schema/proto/sms.pb';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ConfirmOtpCommand,
  InvalidOtpCommand,
  SendOtpCommand,
} from './cqrs/command';
import { GetPhoneNumberQuery } from './cqrs/query';

@Controller()
export class SmsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @GrpcMethod(SMS_SERVICE_NAME, 'SendOtp')
  async sendOtp(input: SendOtpRequest) {
    return await this.commandBus.execute(new SendOtpCommand(input));
  }

  @GrpcMethod(SMS_SERVICE_NAME, 'ConfirmOtp')
  async confirmOtp(input: ConfirmOtpRequest) {
    return await this.commandBus.execute(new ConfirmOtpCommand(input));
  }

  @GrpcMethod(SMS_SERVICE_NAME, 'GetPhoneNumber')
  async getPhoneNumber(input: GetPhoneNumberRequest) {
    return await this.queryBus.execute(new GetPhoneNumberQuery(input));
  }
  @GrpcMethod(SMS_SERVICE_NAME, 'inValidOtp')
  async inValidOtp(input: ConfirmOtpRequest) {
    return await this.commandBus.execute(new InvalidOtpCommand(input));
  }
}
