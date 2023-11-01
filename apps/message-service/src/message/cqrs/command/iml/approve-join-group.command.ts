import { ApproveJoinGroupRequest } from '@app/proto-schema/proto/message.pb';
import { ICommand } from '@nestjs/cqrs';

export class ApproveJoinGroupCommand implements ICommand {
  constructor(
    public readonly cmd: ApproveJoinGroupRequest,
    public readonly ownerId: string,
  ) {}
}
