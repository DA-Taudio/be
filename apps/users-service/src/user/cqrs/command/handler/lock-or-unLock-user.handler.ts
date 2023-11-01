import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LockOrUnLockUserCommand } from '../impl';
import { UserRepository } from '../../../users.repository';
import { RpcException } from '@nestjs/microservices';
import { UserEntity } from '@app/core';
import { convertToObjectId, hashPassword } from '@app/utils';
import { LockOrUnLockUserResponse } from '@app/proto-schema/proto/user.pb';

@CommandHandler(LockOrUnLockUserCommand)
export class LockOrUnLockUserHandler
  implements ICommandHandler<LockOrUnLockUserCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(
    command: LockOrUnLockUserCommand,
  ): Promise<LockOrUnLockUserResponse> {
    const { cmd } = command;
    const user = await this.userRepository.findById(cmd.id);
    if (!user) {
      throw new RpcException('Ngườii dùng không tồn tại !');
    }
    await this.userRepository.findOneAndUpdate(
      {
        _id: convertToObjectId(cmd.id),
      },
      {
        $set: {
          active: !user.active,
        },
      },
    );
    return { success: true };
  }
}
