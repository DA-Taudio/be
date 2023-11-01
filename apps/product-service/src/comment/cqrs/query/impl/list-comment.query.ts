import { ListCommentRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListCommentQuery implements IQuery {
  constructor(public readonly query: ListCommentRequest) {}
}
