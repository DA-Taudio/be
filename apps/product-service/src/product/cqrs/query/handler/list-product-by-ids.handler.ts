import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListProductByIdsQuery } from '../iml';
import { ListProductByIdsResponse } from '@app/proto-schema/proto/product.pb';
import { ProductRepository } from '../../../product.repository';
import { FindNoSQL } from '@app/core';
import { convertToObjectId } from '@app/utils';

@QueryHandler(ListProductByIdsQuery)
export class ListProductByIdsHandler
  implements IQueryHandler<ListProductByIdsQuery>
{
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute({
    query,
  }: ListProductByIdsQuery): Promise<ListProductByIdsResponse> {
    const { ids } = query;
    const idArr = ids.map((obj) => convertToObjectId(obj));

    const data = await this._productRepository.find({
      where: {
        deletedAt: null,
        _id: { $in: idArr },
      },
    });
    return { data } as unknown as ListProductByIdsResponse;
  }
}
