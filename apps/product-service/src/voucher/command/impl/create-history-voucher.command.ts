import { CreateHistoryVoucherRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class CreateHistoryVoucherCommand implements ICommand {
  constructor(public readonly cmd: CreateHistoryVoucherRequest) {}
}
