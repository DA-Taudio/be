import { ListConversationRequest } from '@app/proto-schema/proto/message.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListConversationQuery implements IQuery {
  constructor(public readonly query: ListConversationRequest) {}
}
