import { VerifyPhoneRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class VerifyPhoneCommand implements ICommand {
  constructor(public readonly cmd: VerifyPhoneRequest) {}
}
