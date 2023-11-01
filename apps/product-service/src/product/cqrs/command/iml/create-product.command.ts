import { CreateProductRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class CreateProductCommand implements ICommand {
  constructor(public readonly cmd: CreateProductRequest) {}
}
