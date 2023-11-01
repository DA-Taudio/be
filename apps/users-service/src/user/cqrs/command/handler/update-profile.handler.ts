import { UpdateProfileResponse } from '@app/proto-schema/proto/user.pb';
import { convertToObjectId } from '@app/utils';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../users.repository';
import { UpdateProfileCommand } from '../impl';

@CommandHandler(UpdateProfileCommand)
export class UpdateProfileHandler
  implements ICommandHandler<UpdateProfileCommand>
{
  constructor(private readonly _userRepository: UserRepository) {}

  async execute({ cmd }: UpdateProfileCommand): Promise<UpdateProfileResponse> {
    const { userId, ...input } = cmd;
    if (input.birthday) {
      const birthday = new Date(input.birthday);
      const { ok } = await this._userRepository.findOneAndUpdate(
        { _id: convertToObjectId(userId) },
        { $set: { ...input, birthday } },
      );
      return {
        updated: !!ok,
      };
    }
    const { ok } = await this._userRepository.findOneAndUpdate(
      { _id: convertToObjectId(userId) },
      { $set: { ...input } },
    );

    return {
      updated: !!ok,
    };
  }
}
