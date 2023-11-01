import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetListNotificationQuery } from '../impl';
import { Logger } from '@nestjs/common';
import { FindNoSQL } from '@app/core';
import { deriveObjectSortQueryToMongoDBSort } from '@app/utils/transform/deriveSortQueryToMongoDBSort';
import { NotificationRepository } from '../../../notification.repository';
import { ListNotificationResponse } from '@app/proto-schema/proto/notification.pb';

@QueryHandler(GetListNotificationQuery)
export class GetListNotificationHandler
  implements IQueryHandler<GetListNotificationQuery>
{
  logger = new Logger(this.constructor.name);

  constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly find: FindNoSQL,
  ) {}

  async execute(
    input: GetListNotificationQuery,
  ): Promise<ListNotificationResponse> {
    const { cmd, queryBy } = input;
    const { pagination, sort } = cmd;
    const { limit, page } = pagination;
    const offset = (page - 1) * limit;

    const allData = await this.notificationRepository.find();

    const hasReceiver = [];

    for (const notification of allData) {
      if (Array.isArray(notification.receiverId)) {
        notification?.receiverId.map((receiver) => {
          if (receiver === queryBy) hasReceiver.push(notification._id);
        });
      }
    }

    let optionParams: any = {
      where: {
        deletedAt_eq: null,
        _id_in: hasReceiver,
      },
    };

    if (sort) {
      optionParams = {
        ...optionParams,
        orderBy: deriveObjectSortQueryToMongoDBSort(sort as any),
      };
    }

    if (pagination) {
      optionParams = {
        ...optionParams,
        limit,
        offset,
      };
    }

    const option = this.find.getOption(optionParams);

    const result = await this.notificationRepository.findAndCount({
      ...option,
    });

    const [data, totalCount] = result;

    return {
      data: data || [],
      totalItem: totalCount,
      pagination: {
        currentPage: page,
        totalPage: Math.round(totalCount / limit),
        pageSize: limit,
      },
    } as unknown as ListNotificationResponse;
  }
}
