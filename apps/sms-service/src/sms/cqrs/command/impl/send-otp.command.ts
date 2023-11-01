import { SendOtpRequest } from '@app/proto-schema/proto/sms.pb';
import { ICommand } from '@nestjs/cqrs';

export class SendOtpCommand implements ICommand {
  constructor(public readonly cmd: SendOtpRequest) {}
}
