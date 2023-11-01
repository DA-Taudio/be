import { ListNotificationRequest } from '@app/proto-schema/proto/notification.pb';
import { IQuery } from '@nestjs/cqrs';

export class GetListNotificationQuery implements IQuery {
  constructor(
    public readonly cmd: ListNotificationRequest,
    public readonly queryBy: string,
  ) {}
}
