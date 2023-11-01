import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListUserQuery } from '../impl';
import { ListUserResponse } from '@app/proto-schema/proto/user.pb';
import { UserRepository } from '../../../users.repository';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(ListUserQuery)
export class ListUserHandler implements IQueryHandler<ListUserQuery> {
  constructor(private userRepository: UserRepository) {}
  async execute({ query }: ListUserQuery): Promise<ListUserResponse> {
    const user = await this.userRepository.find({
      where: {
        $or: [
          { deletedAt: null },
          {
            deletedAt: { $gt: new Date() },
          },
        ],
      },
      order: {
        createdAt: -1,
      },
    });

    return { user } as unknown as ListUserResponse;
  }
}
