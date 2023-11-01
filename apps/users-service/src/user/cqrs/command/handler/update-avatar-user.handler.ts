import { UpdateAvatarUserResponse } from '@app/proto-schema/proto/user.pb';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { UserRepository } from '../../../users.repository';
import { UpdateAvatarUserCommand } from '../impl';

@CommandHandler(UpdateAvatarUserCommand)
export class UpdateAvatarUserHandler
  implements ICommandHandler<UpdateAvatarUserCommand>
{
  constructor(private readonly _userRepository: UserRepository) {}

  async execute({
    cmd,
    userId,
  }: UpdateAvatarUserCommand): Promise<UpdateAvatarUserResponse> {
    const user = await this._userRepository.findById(userId);
    if (!user) throw new RpcException('User Not Found !');

    user.avatarId = cmd.avatarId;
    await this._userRepository.save(user);

    return {
      success: true,
    };
  }
}
