import { ClearCartRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class ClearCartCommand implements ICommand {
  constructor(
    public readonly cmd: ClearCartRequest,
    public readonly userId: string,
  ) {}
}
