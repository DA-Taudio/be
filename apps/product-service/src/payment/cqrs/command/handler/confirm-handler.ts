import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ConfirmOrderCommand } from '../iml';
import { OrderRepository } from '../../../order.repository';
import { convertToObjectId } from '@app/utils';
import { ShippingStatus } from '@app/core';
import { ConfirmOrderResponse } from '@app/proto-schema/proto/product.pb';

@CommandHandler(ConfirmOrderCommand)
export class ConfirmOrderHandler
  implements ICommandHandler<ConfirmOrderCommand>
{
  constructor(private readonly _orderRepository: OrderRepository) {}

  async execute({ cmd }: ConfirmOrderCommand): Promise<any> {
    const { orderId } = cmd;
    await this._orderRepository.findOneAndUpdate(
      {
        _id: convertToObjectId(orderId),
      },
      {
        $set: {
          shippingStatus: ShippingStatus.SHIPPING,
        },
      },
    );
    return { success: true } as ConfirmOrderResponse;
  }
}
