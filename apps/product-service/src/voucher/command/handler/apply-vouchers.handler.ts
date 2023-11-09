import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TypeEntity, VoucherEntity } from '@app/core';
import { ApplyVouchersResponse } from '@app/proto-schema/proto/product.pb';
import { RpcException } from '@nestjs/microservices';
import { VoucherRepository } from '../../voucher.repository';
import { ApplyVouchersCommand } from '../impl';
import { ProductRepository } from 'apps/product-service/src/product/product.repository';

@CommandHandler(ApplyVouchersCommand)
export class ApplyVouchersHandler
  implements ICommandHandler<ApplyVouchersCommand>
{
  constructor(
    private readonly _voucherRepository: VoucherRepository,
    private readonly _productRepository: ProductRepository,
  ) {}
  async execute({ cmd }: ApplyVouchersCommand): Promise<ApplyVouchersResponse> {
    let amount;
    let newItems = [];
    const { couponCode, items } = cmd;
    const data = await this._voucherRepository.find({
      where: {
        deletedAt: null,
        code: {
          $in: couponCode,
        },
      },
    });

    if (data.length !== couponCode.length)
      throw new RpcException('Voucher không hợp lệ!');

    console.log(data);

    await Promise.all(
      items.map(async (item: any) => {
        const { id, quantity } = item;
        const product = await this._productRepository.findById(id);

        if (!product) {
          throw new RpcException('Sản phẩm không tồn tại !');
        }
        item.name = product.name;
        item.price = product.price;
        amount += product.price * quantity;
        newItems.push(item);
      }),
    );

    return {
      discountAmount: 0,
      info: [
        {
          code: '',
          reducedAmount: 0,
          voucherId: '',
        },
      ],
      totalPayment: amount,
      items: newItems,
    };
  }
}
