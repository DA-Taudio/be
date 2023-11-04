import { DeleteVoucherRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class DeleteVoucherCommand implements ICommand {
  constructor(public readonly cmd: DeleteVoucherRequest) {}
}
