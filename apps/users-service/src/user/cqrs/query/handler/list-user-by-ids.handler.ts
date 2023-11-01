import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetListUserByIdsQuery } from '../impl';
import { UserRepository } from '../../../users.repository';
import { GetListUserByIdsResponse } from '@app/proto-schema/proto/user.pb';
import { Logger } from '@nestjs/common';
import { convertToObjectId } from '@app/utils';

@QueryHandler(GetListUserByIdsQuery)
export class GetListUserByIdsHandler
  implements IQueryHandler<GetListUserByIdsQuery>
{
  logger = new Logger(this.constructor.name);

  constructor(private readonly _userRepository: UserRepository) {}
  async execute({
    query,
  }: GetListUserByIdsQuery): Promise<GetListUserByIdsResponse> {
    const { ids } = query;
    const objectIds = ids.map((id) => {
      return convertToObjectId(id);
    });

    const result = await this._userRepository.find({
      where: {
        _id: { $in: objectIds },
      },
    });
    return { user: result } as unknown as GetListUserByIdsResponse;
  }
}
