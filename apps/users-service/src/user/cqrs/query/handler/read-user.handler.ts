import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ReadUserQuery } from '../impl';
import { ReadUserResponse } from '@app/proto-schema/proto/user.pb';
import { UserRepository } from '../../../users.repository';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(ReadUserQuery)
export class ReadUserHandler implements IQueryHandler<ReadUserQuery> {
  constructor(private userRepository: UserRepository) {}
  async execute({ query }: ReadUserQuery): Promise<ReadUserResponse> {
    const { _id } = query;
    const user = await this.userRepository.findById(_id);
    if (!user) {
      throw new RpcException(
        'Không tìm thấy người dùng. Vui lòng liên hệ quản trị viên !',
      );
    }
    return { user } as unknown as ReadUserResponse;
  }
}
