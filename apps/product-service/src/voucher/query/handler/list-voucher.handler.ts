import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { FindNoSQL } from '@app/core';
import { deriveObjectSortQueryToMongoDBSort } from '@app/utils';
import { ListVoucherQuery } from '../impl';
import { VoucherRepository } from '../../voucher.repository';
import {
  ListVoucherResponse,
  VoucherStatus,
} from '@app/proto-schema/proto/product.pb';

@QueryHandler(ListVoucherQuery)
export class ListVoucherHandler implements IQueryHandler<ListVoucherQuery> {
  constructor(
    private readonly _VoucherRepository: VoucherRepository,
    private readonly find: FindNoSQL,
  ) {}

  async execute({ query }: ListVoucherQuery): Promise<ListVoucherResponse> {
    const { query: queryVoucher, filter, pagination } = query;

    const { limit, page } = pagination;
    const offset = (page - 1) * limit;

    let where: any = {
      deletedAt: null,
    };
    if (filter) {
      const { productIds, status_eq, ...inputFilter } = filter;
      where = {
        ...inputFilter,
        deletedAt: null,
        ...(productIds && {
          productIds_in: productIds,
        }),
      };
      if (status_eq) {
        switch (status_eq) {
          case VoucherStatus.APPLYING:
            where.startTime_lte = new Date();
            where.endTime_gte = new Date();
            break;
          case VoucherStatus.UPCOMING:
            where.startTime_gte = new Date();
            break;
          case VoucherStatus.EXPIRED:
            where.endTime_lte = new Date();
            break;
        }
      }
    }

    if (queryVoucher) {
      where.code_contains = queryVoucher;
    }

    let orderBy = 'createdAt_DESC';

    const option = this.find.getOption({
      limit,
      offset,
      where,
      orderBy,
    });
    const result = await this._VoucherRepository.findAndCount({
      ...option,
    });
    const [data, totalCount] = result;
    return {
      vouchers: data || [],
      totalItem: totalCount,
      pagination: {
        currentPage: page,
        totalPage: Math.ceil(totalCount / limit),
        pageSize: limit,
      },
    } as unknown as ListVoucherResponse;
  }
}
