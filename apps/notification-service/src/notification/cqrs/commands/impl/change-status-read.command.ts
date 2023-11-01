import { ChangeStatusReadRequest } from '@app/proto-schema/proto/notification.pb';
import { ICommand } from '@nestjs/cqrs';

export class ChangeStatusReadCommand implements ICommand {
  constructor(public readonly cmd: ChangeStatusReadRequest) {}
}
