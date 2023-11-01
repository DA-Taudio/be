import { FavoriteProductRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class FavoriteProductCommand implements ICommand {
  constructor(
    public readonly cmd: FavoriteProductRequest,
    public readonly userId: string,
  ) {}
}
