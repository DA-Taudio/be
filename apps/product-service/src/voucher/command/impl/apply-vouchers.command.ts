import { ApplyVouchersRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class ApplyVouchersCommand implements ICommand {
  constructor(public readonly cmd: ApplyVouchersRequest) {}
}
