import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListOrderAdminQuery } from '../iml';
import { ListOrderResponse } from '@app/proto-schema/proto/product.pb';
import { OrderRepository } from '../../../order.repository';
import { OrderStatus, PaymentMethod } from '@app/core';

@QueryHandler(ListOrderAdminQuery)
export class ListOrderAdminHandler
  implements IQueryHandler<ListOrderAdminQuery>
{
  constructor(private readonly _orderRepository: OrderRepository) {}

  async execute({ query }: ListOrderAdminQuery): Promise<ListOrderResponse> {
    const orders = await this._orderRepository.find({
      where: {
        deletedAt: null,
        $or: [
          {
            paymentMethod: PaymentMethod.OFFLINE,
          },
          {
            paymentMethod: PaymentMethod.ONLINE,
            status: OrderStatus.COMPLETED,
          },
        ],
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return { orders } as unknown as ListOrderResponse;
  }
}
