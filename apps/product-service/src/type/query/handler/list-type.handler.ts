import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListTypeQuery } from '../iml';
import { TypeRepository } from '../../type.repository';
import { ListTypeResponse } from '@app/proto-schema/proto/product.pb';

@QueryHandler(ListTypeQuery)
export class ListTypeHandler implements IQueryHandler<ListTypeQuery> {
  constructor(private readonly _typeRepository: TypeRepository) {}
  async execute(query: ListTypeQuery): Promise<ListTypeResponse> {
    const data = await this._typeRepository.find({
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
    return { data } as unknown as ListTypeResponse;
  }
}
