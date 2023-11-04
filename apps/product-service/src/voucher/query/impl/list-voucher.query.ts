import { ListVoucherRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListVoucherQuery implements IQuery {
  constructor(public readonly query: ListVoucherRequest) {}
}
