import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OtpRepository } from '../../../otp.repository';
import { ConfirmOtpCommand } from '../impl';
import { ConfirmOtpResponse } from '@app/proto-schema/proto/sms.pb';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(ConfirmOtpCommand)
export class ConfirmOtpHandler implements ICommandHandler<ConfirmOtpCommand> {
  constructor(private otpRepository: OtpRepository) {}
  async execute({ cmd }: ConfirmOtpCommand): Promise<ConfirmOtpResponse> {
    const { otp: inputOTP, sessionId } = cmd;

    const session = await this.otpRepository.findOne({
      where: {
        sessionId: sessionId,
      },
    });
    if (!session) {
      throw new RpcException('Phiên làm việc đã kết thúc');
    }
    const { otpExpiredTime, otp, isActive } = session;
    if (otp !== inputOTP) {
      throw new RpcException('Mã xác thực không chính xác !');
    }
    if (new Date() > otpExpiredTime || isActive) {
      throw new RpcException('Mã xác thực đã hết hạn !');
    }

    const { result } = await this.otpRepository.updateOne(
      { sessionId },
      { $set: { isActive: true } },
    );

    return {
      confirmed: !!result.ok,
    };
  }
}
