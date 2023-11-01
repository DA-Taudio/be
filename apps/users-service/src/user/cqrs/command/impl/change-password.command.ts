import { ChangePasswordRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class ChangePasswordCommand implements ICommand {
  constructor(public readonly cmd: ChangePasswordRequest) {}
}
