import { DeleteProductRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class DeleteProductCommand implements ICommand {
  constructor(public readonly cmd: DeleteProductRequest) {}
}
