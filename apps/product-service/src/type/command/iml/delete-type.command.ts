import { DeleteTypeRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class DeleteTypeCommand implements ICommand {
  constructor(public readonly cmd: DeleteTypeRequest) {}
}
