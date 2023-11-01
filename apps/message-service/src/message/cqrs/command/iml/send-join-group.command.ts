import { SendJoinGroupRequest } from '@app/proto-schema/proto/message.pb';
import { ICommand } from '@nestjs/cqrs';

export class SendJoinGroupCommand implements ICommand {
  constructor(
    public readonly cmd: SendJoinGroupRequest,
    public readonly userId: string,
  ) {}
}
