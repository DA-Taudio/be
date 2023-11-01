import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendOtpCommand } from '../impl';
import { OtpRepository } from '../../../otp.repository';
import { OtpEntity } from '@app/core';
import { SendOtpResponse } from '@app/proto-schema/proto/sms.pb';
import * as moment from 'moment';
import { generateOTP } from '@app/utils';
import * as ms from 'ms';
const mongoose = require('mongoose');
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@CommandHandler(SendOtpCommand)
export class SendOtpHandler implements ICommandHandler<SendOtpCommand> {
  constructor(
    private readonly _otpRepository: OtpRepository,
    @InjectQueue('sms') private readonly smsQueue: Queue,
  ) {}
  async execute(command: SendOtpCommand): Promise<SendOtpResponse> {
    const { cmd } = command;
    const { phoneNumber: inputPhone } = cmd;

    const otpGenerate = await generateOTP(6);
    const { otpExpiredTime, otp, phoneNumber, sessionId } =
      await this._otpRepository.save(
        new OtpEntity({
          otp: otpGenerate,
          phoneNumber: inputPhone,
          otpExpiredTime: moment()
            .add(ms('2m') / 1000, 's')
            .toDate(),
          sessionId: mongoose.Types.ObjectId().toString(),
        }),
      );

    this.smsQueue.add('sendSmsQueue', {
      phoneNumber: inputPhone,
      otp: otpGenerate,
    });
    return {
      otpExpiredTime,
      phoneNumber,
      sessionId,
    } as unknown as SendOtpResponse;
  }
}
