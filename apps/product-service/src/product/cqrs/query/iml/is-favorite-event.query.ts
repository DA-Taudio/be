import { IsFavoriteProductRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class IsFavoriteProductQuery implements IQuery {
  constructor(
    public readonly query: IsFavoriteProductRequest,
    public readonly userId: string,
  ) {}
}
