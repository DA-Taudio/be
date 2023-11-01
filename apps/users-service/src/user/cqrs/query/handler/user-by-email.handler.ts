import { ReadUserResponse } from '@app/proto-schema/proto/user.pb';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../../users.repository';
import { GetUserByEmailQuery } from '../impl';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailHandler
  implements IQueryHandler<GetUserByEmailQuery>
{
  constructor(private readonly _userRepository: UserRepository) {}

  async execute({ query }: GetUserByEmailQuery): Promise<ReadUserResponse> {
    const { email } = query;
    const user = await this._userRepository.findOne({ email });
    return { user } as unknown as ReadUserResponse;
  }
}
