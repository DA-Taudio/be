import { CommentEntity } from '@app/core';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  CommentRepository,
  ProductRepository,
} from '../../../comment.repository';
import { CreateCommentCommand } from '../impl';
import { CreateCommentResponse } from '@app/proto-schema/proto/product.pb';
import { convertToObjectId } from '@app/utils';

@CommandHandler(CreateCommentCommand)
export class CreateCommentHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(
    private readonly _commentRepository: CommentRepository,
    private readonly _productRepository: ProductRepository,
  ) {}

  async execute({
    cmd,
    userId: inputUserId,
  }: CreateCommentCommand): Promise<CreateCommentResponse> {
    const { ...input } = cmd;
    const data = await this._commentRepository.save(
      new CommentEntity({
        ...input,
        userId: inputUserId,
      }),
    );
    if (data) {
      const { value } = await this._productRepository.findOneAndUpdate(
        {
          _id: convertToObjectId(input.productId),
        },
        {
          $inc: { totalComment: 1 },
        },
      );
    }

    return data as unknown as CreateCommentResponse;
  }
}
