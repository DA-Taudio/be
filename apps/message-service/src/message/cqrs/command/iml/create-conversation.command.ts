import { CreateConversationRequest } from '@app/proto-schema/proto/message.pb';
import { ICommand } from '@nestjs/cqrs';

export class CreateConversationCommand implements ICommand {
  constructor(
    public readonly cmd: CreateConversationRequest,
    public readonly userId: string,
  ) {}
}
