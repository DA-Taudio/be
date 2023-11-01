import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListConversationQuery } from '../iml';
import { ListConversationResponse } from '@app/proto-schema/proto/message.pb';
import { ConversationRepository } from '../../../message.repository';

@QueryHandler(ListConversationQuery)
export class ListConversationHandler
  implements IQueryHandler<ListConversationQuery>
{
  constructor(
    private readonly _conversationRepository: ConversationRepository,
  ) {}

  async execute({
    query,
  }: ListConversationQuery): Promise<ListConversationResponse> {
    const data = await this._conversationRepository
      .aggregate([
        {
          $match: {
            members: { $in: [query.userId] },
            deletedAt: null,
          },
        },
      ])
      .toArray();
    return { data } as unknown as ListConversationResponse;
  }
}
