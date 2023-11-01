import { CreatePaymentRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class CreatePaymentCommand implements ICommand {
  constructor(
    public readonly cmd: CreatePaymentRequest,
    public readonly userId: string,
  ) {}
}
