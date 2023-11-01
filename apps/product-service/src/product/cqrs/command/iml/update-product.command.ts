import { UpdateProductRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class UpdateProductCommand implements ICommand {
  constructor(public readonly cmd: UpdateProductRequest) {}
}
