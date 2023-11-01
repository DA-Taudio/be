import { ChangePasswordWhenLoginRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class ChangePasswordWhenLoginCommand implements ICommand {
  constructor(
    public readonly cmd: ChangePasswordWhenLoginRequest,
    public readonly userId: string,
  ) {}
}
