import { CreateCommentRequest } from '@app/proto-schema/proto/product.pb';
import { ICommand } from '@nestjs/cqrs';

export class CreateCommentCommand implements ICommand {
  constructor(
    public readonly cmd: CreateCommentRequest,
    public readonly userId: string,
  ) {}
}
