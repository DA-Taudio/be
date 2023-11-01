import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VerifyPhoneCommand } from '../impl';
import { UserRepository } from '../../../users.repository';
import { RpcException } from '@nestjs/microservices';
import { VerifyPhoneResponse } from '@app/proto-schema/proto/user.pb';

@CommandHandler(VerifyPhoneCommand)
export class VerifyPhoneHandler implements ICommandHandler<VerifyPhoneCommand> {
  constructor(private userRepository: UserRepository) {}
  async execute(command: VerifyPhoneCommand): Promise<VerifyPhoneResponse> {
    const { cmd } = command;
    const { phoneNumber } = cmd;
    const user = await this.userRepository.findOne({
      where: {
        phoneNumber,
      },
    });
    if (!user) {
      throw new RpcException('Tài khoản không tồn tại !');
    }
    await this.userRepository.updateOne(
      {
        _id: user._id,
      },
      {
        $set: {
          verifyPhone: true,
        },
      },
    );
    return { verified: true };
  }
}
