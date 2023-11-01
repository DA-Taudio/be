import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { CommentRepository } from '../../../comment.repository';
import { ListCommentResponse } from '@app/proto-schema/proto/product.pb';
import { ListFeedbackQuery } from '../impl/list-feedback.query';

@QueryHandler(ListFeedbackQuery)
export class ListFeedbackHandler implements IQueryHandler<ListFeedbackQuery> {
  constructor(private readonly _commentRepository: CommentRepository) {}
  async execute({ query }: ListFeedbackQuery): Promise<ListCommentResponse> {
    const data = await this._commentRepository
      .aggregate([
        {
          $match: {
            parentId: query.parentId,
          },
        },
        {
          $sort: {
            createdAt: 1,
          },
        },
      ])
      .toArray();

    return { data } as unknown as ListCommentResponse;
  }
}
