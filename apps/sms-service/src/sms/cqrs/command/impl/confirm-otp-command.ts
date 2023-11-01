import { ConfirmOtpRequest } from '@app/proto-schema/proto/sms.pb';
import { ICommand } from '@nestjs/cqrs';

export class ConfirmOtpCommand implements ICommand {
  constructor(public readonly cmd: ConfirmOtpRequest) {}
}
