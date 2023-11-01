import { ChangePasswordWhenLoginResponse } from '@app/proto-schema/proto/user.pb';
import { comparePassword, hashPassword } from '@app/utils';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { UserRepository } from '../../../users.repository';
import { ChangePasswordWhenLoginCommand } from '../impl';

@CommandHandler(ChangePasswordWhenLoginCommand)
export class ChangePasswordWhenLoginHandler
  implements ICommandHandler<ChangePasswordWhenLoginCommand>
{
  constructor(private readonly _userRepository: UserRepository) {}

  async execute({
    cmd,
    userId,
  }: ChangePasswordWhenLoginCommand): Promise<ChangePasswordWhenLoginResponse> {
    const { currentPassword, newPassword } = cmd;

    const user = await this._userRepository.findById(userId);
    if (!user) throw new RpcException('Tài khoản không tồn tại !');

    //compare currentPassword with user pass
    if (!(await comparePassword(currentPassword, user.password))) {
      throw new RpcException('Mật khẩu không đúng !');
    }

    await this._userRepository.update(
      { _id: user._id },
      {
        password: await hashPassword(newPassword),
      },
    );

    return {
      changed: true,
    };
  }
}
