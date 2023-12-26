import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TypeEntity, VoucherEntity } from '@app/core';
import { ApplyVouchersResponse } from '@app/proto-schema/proto/product.pb';
import { RpcException } from '@nestjs/microservices';
import {
  HistoryVoucherRepository,
  VoucherRepository,
} from '../../voucher.repository';
import { ApplyVouchersCommand } from '../impl';
import { ProductRepository } from 'apps/product-service/src/product/product.repository';

@CommandHandler(ApplyVouchersCommand)
export class ApplyVouchersHandler
  implements ICommandHandler<ApplyVouchersCommand>
{
  constructor(
    private readonly _voucherRepository: VoucherRepository,
    private readonly _productRepository: ProductRepository,
    private readonly _historyVoucherRepository: HistoryVoucherRepository,
  ) {}
  async execute({
    cmd,
    userId,
  }: ApplyVouchersCommand): Promise<ApplyVouchersResponse> {
    let amount = 0;
    let reducedAmount = 0;
    let discountAmount = 0;
    let newItems = [];
    const { couponCode, items } = cmd;

    if (couponCode?.length > 0) {
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

      const [dataUse, countUse] =
        await this._historyVoucherRepository.findAndCount({
          where: {
            userId,
            voucherId: data[0]._id.toString(),
            deletedAt: null,
          },
        });
      if (countUse === data[0].quantity)
        throw new RpcException('Voucher đã hết !');

      const [dataUserUse, countUserUse] =
        await this._historyVoucherRepository.findAndCount({
          where: {
            userId,
            voucherId: data[0]._id.toString(),
            deletedAt: null,
          },
        });
      if (countUserUse === data[0].maxUserUse)
        throw new RpcException('Bạn đã hết lượt sử dụng voucher !');

      await Promise.all(
        items?.map(async (item: any) => {
          const { id, quantity } = item;
          const product = await this._productRepository.findById(id);

          if (!product) {
            throw new RpcException('Sản phẩm không tồn tại !');
          }
          item.name = product.name;
          item.price = product.price;
          amount += product.price * quantity;
          if (data[0]?.productIds?.includes(id)) {
            reducedAmount += (data[0].percent * product.price * quantity) / 100;
          }
          newItems.push(item);
        }),
      );
      reducedAmount =
        reducedAmount >= data[0].maxDiscount
          ? data[0].maxDiscount
          : reducedAmount;

      discountAmount = reducedAmount;
      return {
        discountAmount,
        info: [
          {
            code: data[0].code,
            reducedAmount,
            voucherId: data[0]._id,
          },
        ],
        totalPayment: amount,
        items: newItems,
      };
    }

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

    discountAmount = reducedAmount;
    return {
      discountAmount,
      info: [],
      totalPayment: amount,
      items: newItems,
    };
  }
}
