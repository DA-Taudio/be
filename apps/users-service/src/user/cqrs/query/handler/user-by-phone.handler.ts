import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../users.repository';
import { UserByPhoneQuery } from '../impl';
import { RpcException } from '@nestjs/microservices';
import { ReadUserResponse } from '@app/proto-schema/proto/user.pb';
@QueryHandler(UserByPhoneQuery)
export class GetUserByPhoneHandler implements IQueryHandler<UserByPhoneQuery> {
  constructor(private userRepository: UserRepository) {}
  async execute(input: UserByPhoneQuery): Promise<ReadUserResponse> {
    const { query } = input;
    const user = await this.userRepository.findOne({
      where: {
        phoneNumber: query.phoneNumber,
      },
    });
    if (!user.active) {
      throw new RpcException('Tài khoản của bạn đã bị khoá!');
    }
    if (!user) {
      throw new RpcException('Tài khoản không tồn tại');
    }
    return { user } as unknown as ReadUserResponse;
  }
}
