import { ConfirmOrderResquest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class ConfirmOrderCommand implements ICommand {
  constructor(public readonly cmd: ConfirmOrderResquest) {}
}
