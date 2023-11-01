import { RegisterUserRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class RegisterUserCommand implements ICommand {
  constructor(public readonly cmd: RegisterUserRequest) {}
}
