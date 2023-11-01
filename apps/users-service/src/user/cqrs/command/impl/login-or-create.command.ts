import { LoginOrCreateAccountRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class LoginOrCreateCommand implements ICommand {
  constructor(public readonly cmd: LoginOrCreateAccountRequest) {}
}
