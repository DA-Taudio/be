import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPhoneNumberQuery } from '../impl';
import { GetPhoneNumberResponse } from '@app/proto-schema/proto/sms.pb';
import { OtpRepository } from '../../../otp.repository';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(GetPhoneNumberQuery)
export class GetPhoneNumberHandler
  implements IQueryHandler<GetPhoneNumberQuery>
{
  constructor(private readonly _otpRepository: OtpRepository) {}
  async execute(input: GetPhoneNumberQuery): Promise<GetPhoneNumberResponse> {
    const { query } = input;
    const { sessionId } = query;
    const data = await this._otpRepository.findOne({
      where: {
        sessionId,
      },
    });

    if (!data || new Date() > data.otpExpiredTime)
      throw new RpcException(
        'Đã hết thời gian phiên làm việc. Vui lòng thử lại',
      );

    return {
      phoneNumber: data.phoneNumber,
    };
  }
}
