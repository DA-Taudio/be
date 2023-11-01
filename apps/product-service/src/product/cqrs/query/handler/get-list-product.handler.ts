import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetListProductQuery } from '../iml';
import { GetListProductResponse } from '@app/proto-schema/proto/product.pb';
import { ProductRepository } from '../../../product.repository';
import { RpcException } from '@nestjs/microservices';
import { FindNoSQL } from '@app/core';
import { deriveObjectSortQueryToMongoDBSort } from '@app/utils';

@QueryHandler(GetListProductQuery)
export class GetListProductHandler
  implements IQueryHandler<GetListProductQuery>
{
  constructor(
    private readonly _productRepository: ProductRepository,
    private readonly find: FindNoSQL,
  ) {}

  async execute({
    query,
  }: GetListProductQuery): Promise<GetListProductResponse> {
    const { query: queryProduct, filter, pagination, sort } = query;
    const { limit, page } = pagination;
    const offset = (page - 1) * limit;
    const where: any = {
      ...filter,
      deletedAt: null,
    };

    if (queryProduct) {
      where.name_contains = queryProduct;
    }

    let orderBy;
    if (sort) {
      orderBy = deriveObjectSortQueryToMongoDBSort(sort as any);
    } else {
      orderBy = 'createdAt_DESC';
    }

    const option = this.find.getOption({
      limit,
      offset,
      where,
      orderBy,
    });

    const result = await this._productRepository.findAndCount({
      ...option,
    });
    const [data, totalCount] = result;

    return {
      products: data || [],
      totalItem: totalCount,
      pagination: {
        currentPage: page,
        totalPage: Math.ceil(totalCount / limit),
        pageSize: limit,
      },
    } as unknown as GetListProductResponse;
  }
}
