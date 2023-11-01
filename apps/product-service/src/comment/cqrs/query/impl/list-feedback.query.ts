import { ListFeedbackRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListFeedbackQuery implements IQuery {
  constructor(public readonly query: ListFeedbackRequest) {}
}
