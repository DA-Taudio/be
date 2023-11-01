import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ListOrderUserQuery } from '../iml';
import { ListOrderResponse } from '@app/proto-schema/proto/product.pb';
import { OrderRepository } from '../../../order.repository';
import { OrderStatus, PaymentMethod } from '@app/core';

@QueryHandler(ListOrderUserQuery)
export class ListOrderUserHandler implements IQueryHandler<ListOrderUserQuery> {
  constructor(private readonly _orderRepository: OrderRepository) {}

  async execute({
    query,
    userId,
  }: ListOrderUserQuery): Promise<ListOrderResponse> {
    const orders = await this._orderRepository.find({
      where: {
        userId,
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
