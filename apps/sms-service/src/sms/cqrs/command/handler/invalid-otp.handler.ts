import { ConfirmOtpResponse } from '@app/proto-schema/proto/sms.pb';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { OtpRepository } from '../../../otp.repository';
import { InvalidOtpCommand } from '../impl';

@CommandHandler(InvalidOtpCommand)
export class InvalidOtpHandler implements ICommandHandler<InvalidOtpCommand> {
  constructor(private readonly _otpRepository: OtpRepository) {}

  async execute({ cmd }: InvalidOtpCommand): Promise<ConfirmOtpResponse> {
    const { otp: inputOTP, sessionId } = cmd;

    const session = await this._otpRepository.findOne({
      where: {
        sessionId,
      },
    });
    if (!session)
      throw new RpcException(
        'Đã hết thời gian phiên làm việc. Vui lòng thử lại',
      );

    const { otpExpiredTime, otp, isActive } = session;

    if (otp !== inputOTP)
      throw new RpcException('Mã xác thực không chính xác !');

    if (new Date() > otpExpiredTime)
      throw new RpcException('Mã xác thực đã hết hạn !');

    if (isActive) throw new RpcException('Mã xác thực đã hết hạn !');

    return {
      confirmed: true,
    };
  }
}
