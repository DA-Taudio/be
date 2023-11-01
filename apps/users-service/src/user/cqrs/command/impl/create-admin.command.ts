import { CreateAdminRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class CreateAdminCommand implements ICommand {
  constructor(public readonly cmd: CreateAdminRequest) {}
}
