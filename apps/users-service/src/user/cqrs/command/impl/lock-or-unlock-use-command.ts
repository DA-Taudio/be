import { LockOrUnLockUserRequest } from '@app/proto-schema/proto/user.pb';
import { ICommand } from '@nestjs/cqrs';

export class LockOrUnLockUserCommand implements ICommand {
  constructor(public readonly cmd: LockOrUnLockUserRequest) {}
}
