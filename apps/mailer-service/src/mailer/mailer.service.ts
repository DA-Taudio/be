import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { MAIL_QUEUE, VERIFY_EMAIL } from '../constants';
import { Queue } from 'bull';
import { ConfigService } from '@nestjs/config';
import {
  SendEmailRequest,
  SendEmailResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from '@app/proto-schema/proto/mailer.pb';
import { convertToObjectId, generateOTP } from '@app/utils';
import { OtpRepository } from './otp.repository';
import { OtpEntity } from '@app/core';
import * as moment from 'moment';
import * as ms from 'ms';
import { RpcException } from '@nestjs/microservices';
import { UserRepository } from './users.repository';
const mongoose = require('mongoose');

@Injectable()
export class MailerService {
  private readonly _logger = new Logger(MailerService.name);
  constructor(
    @InjectQueue(MAIL_QUEUE) private readonly _mailQueue: Queue,
    private readonly _configService: ConfigService,
    private readonly _otpRepository: OtpRepository,
    private readonly _userRepository: UserRepository,
  ) {}

  public async sendEmail({
    email,
  }: SendEmailRequest): Promise<SendEmailResponse> {
    const pinCode = await generateOTP(6);
    const { sessionId } = await this._otpRepository.save(
      new OtpEntity({
        otp: pinCode,
        email: email,
        otpExpiredTime: moment()
          .add(ms('9m') / 1000, 's')
          .toDate(),
        sessionId: mongoose.Types.ObjectId().toString(),
      }),
    );
    const data = {
      to: email,
      from: this._configService.get('MAILDEV_INCOMING_USER'),
      subject: 'Welcome to NK-SHOP! Verify your Email',
      template: 'verify-email',
      context: { code: pinCode },
    };
    this._mailQueue.add(VERIFY_EMAIL, {
      ...data,
    });
    return {
      sessionId,
    } as SendEmailResponse;
  }

  public async verifyEmail(
    { otp: inputOTP, sessionId }: VerifyEmailRequest,
    _id,
  ): Promise<VerifyEmailResponse> {
    const session = await this._otpRepository.findOne({
      where: {
        sessionId: sessionId,
      },
    });
    if (!session) {
      throw new RpcException('Phiên làm việc đã kết thúc');
    }
    const { otpExpiredTime, otp, isActive } = session;
    if (otp !== inputOTP) {
      throw new RpcException('Mã xác thực không chính xác !');
    }
    if (new Date() > otpExpiredTime || isActive) {
      throw new RpcException('Mã xác thực đã hết hạn !');
    }

    const { result } = await this._otpRepository.updateOne(
      { sessionId },
      { $set: { isActive: true } },
    );

    await this._userRepository.updateOne(
      { _id: convertToObjectId(_id) },
      {
        $set: {
          email: session.email,
          verifyEmail: true,
        },
      },
    );

    return {
      success: !!result.ok,
    };
  }
}
