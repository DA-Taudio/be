import { CreateNotificationRequest } from '@app/proto-schema/proto/notification.pb';
import { ICommand } from '@nestjs/cqrs';

export class CreateNotificationCommand implements ICommand {
  constructor(public readonly cmd: CreateNotificationRequest) {}
}
