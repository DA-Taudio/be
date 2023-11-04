import { UpdateVoucherRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class UpdateVoucherCommand implements ICommand {
  constructor(public readonly cmd: UpdateVoucherRequest) {}
}
