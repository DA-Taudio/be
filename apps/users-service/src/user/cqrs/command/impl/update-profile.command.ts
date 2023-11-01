import { UpdateProfileRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class UpdateProfileCommand implements ICommand {
  constructor(public readonly cmd: UpdateProfileRequest) {}
}
