import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterUserCommand } from '../impl';
import { UserRepository } from '../../../users.repository';
import { RpcException } from '@nestjs/microservices';
import { UserEntity } from '@app/core';
import { hashPassword } from '@app/utils';
import { RegisterUserResponse } from '@app/proto-schema/proto/user.pb';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  async execute(command: RegisterUserCommand): Promise<RegisterUserResponse> {
    const { cmd } = command;
    const userExist = await this.userRepository.findOne({
      where: {
        phoneNumber: cmd.phoneNumber,
      },
    });

    if (userExist) {
      throw new RpcException('Số điện thoại đã tồn tại');
    }

    const { _id, fullName, phoneNumber } = await this.userRepository.save(
      new UserEntity({
        ...cmd,
        password: await hashPassword(cmd.password),
      } as unknown as UserEntity),
    );
    return { _id, fullName, phoneNumber };
  }
}
