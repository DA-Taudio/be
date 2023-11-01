import { GetAdminByUserNameRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class GetAdminByUserNameQuery implements ICommand {
  constructor(public readonly cmd: GetAdminByUserNameRequest) {}
}
