import { ListOrderAdminRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListOrderAdminQuery implements IQuery {
  constructor(public readonly query: ListOrderAdminRequest) {}
}
