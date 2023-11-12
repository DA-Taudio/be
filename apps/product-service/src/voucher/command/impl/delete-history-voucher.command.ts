import { DeleteHistoryVoucherRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class DeleteHistoryVoucherCommand implements ICommand {
  constructor(public readonly cmd: DeleteHistoryVoucherRequest) {}
}
