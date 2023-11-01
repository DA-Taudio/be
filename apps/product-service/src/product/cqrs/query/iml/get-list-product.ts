import { GetListProductRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class GetListProductQuery implements IQuery {
  constructor(public readonly query: GetListProductRequest) {}
}
