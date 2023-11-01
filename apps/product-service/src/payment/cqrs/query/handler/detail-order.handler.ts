import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DetailOrderQuery } from '../iml';
import { OrderRepository } from '../../../order.repository';
import { OrderDto } from '@app/proto-schema/proto/product.pb';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(DetailOrderQuery)
export class DetailOrderHandler implements IQueryHandler<DetailOrderQuery> {
  constructor(private readonly orderRepository: OrderRepository) {}
  async execute({ query }: DetailOrderQuery): Promise<OrderDto> {
    const { orderId } = query;
    const order = await this.orderRepository.findById(orderId);
    if (!order) {
      throw new RpcException('Đơn hàng không tồn tại !');
    }

    return order as unknown as OrderDto;
  }
}
