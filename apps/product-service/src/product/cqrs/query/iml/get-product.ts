import { GetProductRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class GetProductQuery implements IQuery {
  constructor(public readonly query: GetProductRequest) {}
}
