import { DetailOrderRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class DetailOrderQuery implements IQuery {
  constructor(public readonly query: DetailOrderRequest) {}
}
