import { ProductType } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class CreateTypeCommand implements ICommand {
  constructor(public readonly cmd: ProductType) {}
}
