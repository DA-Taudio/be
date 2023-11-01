import { ConfirmOtpHandler } from './confirm-otp.hanler';
import { InvalidOtpHandler } from './invalid-otp.handler';
import { SendOtpHandler } from './send-otp.handler';
export const SmsCommandHandlers = [
  SendOtpHandler,
  ConfirmOtpHandler,
  InvalidOtpHandler,
];
