import { ListProductByIdsRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListProductByIdsQuery implements IQuery {
  constructor(public readonly query: ListProductByIdsRequest) {}
}
