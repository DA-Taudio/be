import { RemoveFromCartRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class RemoveFromCartCommand implements ICommand {
  constructor(
    public readonly cmd: RemoveFromCartRequest,
    public readonly userId: string,
  ) {}
}
