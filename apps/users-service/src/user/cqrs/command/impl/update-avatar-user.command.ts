import { UpdateAvatarUserRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class UpdateAvatarUserCommand implements ICommand {
  constructor(
    public readonly cmd: UpdateAvatarUserRequest,
    public readonly userId: string,
  ) {}
}
