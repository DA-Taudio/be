import { AddToCartRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class AddToCartCommand implements ICommand {
  constructor(
    public readonly cmd: AddToCartRequest,
    public readonly userId: string,
  ) {}
}
