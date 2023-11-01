import { ListCartRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListCartQuery implements IQuery {
  constructor(
    public readonly query: ListCartRequest,
    public readonly userId: string,
  ) {}
}
