import { GetVoucherRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class GetVoucherQuery implements IQuery {
  constructor(public readonly query: GetVoucherRequest) {}
}
