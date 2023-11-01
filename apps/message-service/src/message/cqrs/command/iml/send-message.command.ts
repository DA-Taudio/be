import { SendMessageRequest } from '@app/proto-schema/proto/message.pb';
import { ICommand } from '@nestjs/cqrs';

export class SendMessageCommand implements ICommand {
  constructor(public readonly cmd: SendMessageRequest) {}
}
