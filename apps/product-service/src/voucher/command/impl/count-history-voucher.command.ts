import { CountHistoryVoucherRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class CountHistoryVoucherCommand implements ICommand {
  constructor(public readonly cmd: CountHistoryVoucherRequest) {}
}
