import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListMessageQuery } from '../iml';
import { ListMessageResponse } from '@app/proto-schema/proto/message.pb';
import { MessageRepository } from '../../../message.repository';
import { FindNoSQL } from '@app/core';

@QueryHandler(ListMessageQuery)
export class ListMessageHandler implements IQueryHandler<ListMessageQuery> {
  constructor(
    private readonly _MessageRepository: MessageRepository,
    private readonly find: FindNoSQL,
  ) {}

  async execute({ query }: ListMessageQuery): Promise<ListMessageResponse> {
    const { conversationId, pagination } = query;
    const { limit, page } = pagination;
    const offset = (page - 1) * limit;
    const where: any = {
      conversationId_eq: conversationId,
      deleteAt: null,
    };
    const option = this.find.getOption({
      limit,
      offset,
      where,
      orderBy: 'createdAt_ASC',
    });

    const [data, totalCount] = await this._MessageRepository.findAndCount({
      ...option,
    });
    return { data } as unknown as ListMessageResponse;
  }
}
