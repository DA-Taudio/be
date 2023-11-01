import { ListMessageRequest } from '@app/proto-schema/proto/message.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListMessageQuery implements IQuery {
  constructor(public readonly query: ListMessageRequest) {}
}
