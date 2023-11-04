import { CreateVoucherRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class CreateVoucherCommand implements ICommand {
  constructor(public readonly cmd: CreateVoucherRequest) {}
}
