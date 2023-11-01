import { ListOrderUserRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListOrderUserQuery implements IQuery {
  constructor(
    public readonly query: ListOrderUserRequest,
    public readonly userId: string,
  ) {}
}
