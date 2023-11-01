import { ChangePasswordResponse } from '@app/proto-schema/proto/user.pb';
import { hashPassword } from '@app/utils';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { UserRepository } from '../../../users.repository';
import { ChangePasswordCommand } from '../impl';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly _userRepository: UserRepository) {}

  async execute({
    cmd,
  }: ChangePasswordCommand): Promise<ChangePasswordResponse> {
    const { password, phoneNumber } = cmd;
    const user = await this._userRepository.findOne({
      where: {
        phoneNumber,
      },
    });

    if (!user) throw new RpcException('Tài khoản không tồn tại !');

    await this._userRepository.update(
      { _id: user._id },
      {
        password: await hashPassword(password),
      },
    );

    return {
      updated: true,
    };
  }
}
