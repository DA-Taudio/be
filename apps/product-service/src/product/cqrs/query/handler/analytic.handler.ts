import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { AnalyticResponse } from '@app/proto-schema/proto/product.pb';
import { ProductRepository } from '../../../product.repository';
import { UserRepository } from 'apps/mailer-service/src/mailer/users.repository';
import { OrderRepository } from 'apps/product-service/src/payment/order.repository';
import { OrderStatus } from '@app/core';
import { AnalyticQuery } from '../iml';

@QueryHandler(AnalyticQuery)
export class AnalyticHandler implements IQueryHandler<AnalyticQuery> {
  constructor(
    private readonly _repository: ProductRepository,
    private readonly _userRepository: UserRepository,
    private readonly _orderRepository: OrderRepository,
  ) {}
  async execute({ cmd }: AnalyticQuery): Promise<any> {
    const { startTime, endTime } = cmd;
    console.log(new Date(startTime));
    console.log(new Date(endTime));
    const [product, countProduct] =
      await this._repository.findAllAndCountWithoutDeletedAt({});

    const [user, countUser] =
      await this._userRepository.findAllAndCountWithoutDeletedAt({});

    const [order, countOrder] =
      await this._orderRepository.findAllAndCountWithoutDeletedAt({
        status: OrderStatus.COMPLETED,
      });

    const revenue = order.reduce((total, item) => {
      return total + item.amount;
    }, 0);
    const data = await this._orderRepository
      .aggregate([
        {
          $match: {
            status: OrderStatus.COMPLETED,
            createdAt: {
              $gte: new Date(startTime),
              $lte: new Date(endTime),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
              day: { $dayOfMonth: '$createdAt' },
            },
            order: { $sum: 1 },
            revenue: { $sum: '$amount' },
          },
        },
        {
          $project: {
            _id: 0,
            date: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: {
                  $dateFromParts: {
                    year: '$_id.year',
                    month: '$_id.month',
                    day: '$_id.day',
                  },
                },
              },
            },
            order: 1,
            revenue: 1,
          },
        },
      ])
      .toArray();

    return {
      product: countProduct,
      user: countUser,
      order: countOrder,
      revenue,
      detail: data,
    } as AnalyticResponse;
  }
}
