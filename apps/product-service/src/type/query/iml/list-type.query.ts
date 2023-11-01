import { ListTypeRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListTypeQuery implements IQuery {
  constructor(public readonly query: ListTypeRequest) {}
}
