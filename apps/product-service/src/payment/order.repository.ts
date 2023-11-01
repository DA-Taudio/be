import { BaseRepository } from '@app/core';
import { OrderEntity } from '@app/core/entities/cart';
import { OrderTransaction } from '@app/core/entities/cart/order.embeded';
import { convertToObjectId } from '@app/utils';
import { EntityRepository } from 'typeorm';

@EntityRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> {
  async updateOrderTransaction(orderId, data: OrderTransaction) {
    const { result } = await this.updateOne(
      { _id: convertToObjectId(orderId) },
      {
        $set: {
          transaction: {
            ...data,
          },
        },
      },
    );
    return result;
  }
}
