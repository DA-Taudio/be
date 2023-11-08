import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePaymentCommand } from '../iml';
import { OrderRepository } from '../../../order.repository';
import {
  CreatePaymentResponse,
  PaymentProvider,
} from '@app/proto-schema/proto/product.pb';
import { ProductRepository } from '../../../../product/product.repository';
import { RpcException } from '@nestjs/microservices';
import { OrderEntity } from '@app/core/entities/cart';
import { OrderStatus, PaymentMethod, ShippingStatus } from '@app/core';
import { ZaloPayService } from '../../../zalopay.service';
import { convertToObjectId } from '@app/utils';
import { VNPayService } from '../../../vnpay.service';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand>
{
  constructor(
    private readonly _orderRepository: OrderRepository,
    private readonly _productRepository: ProductRepository,
    private readonly _zaloPayService: ZaloPayService,
    private readonly _vnPayService: VNPayService,
  ) {}
  async execute({
    cmd,
    userId,
  }: CreatePaymentCommand): Promise<CreatePaymentResponse> {
    const {
      code,
      description,
      couponCode,
      items,
      paymentMethod,
      paymentType,
      paymentProvider,
      shippingAddress,
    } = cmd;
    let amount = 0;
    const newItems = [];
    const discountAmount = 0; // xử lý bởi couponCode

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
    const amountAfterDiscount = amount - discountAmount;

    const order = {
      amount: amountAfterDiscount,
      description: description || `Mua đồ gia dụng thông minh`,
      code,
      items: newItems,
      userId,
      discountAmount,
      subTotal: amount,
      couponCode,
      paymentMethod,
      shippingStatus: ShippingStatus.NOT_SHIPPED,
      shippingAddress,
    };
    //Thanh toán online
    if (paymentMethod === PaymentMethod.ONLINE) {
      const orderUser = await this._orderRepository.save(
        new OrderEntity({ ...order }),
      );

      if (paymentProvider === PaymentProvider.ZALOPAY) {
        const { returnUrl } = await this._zaloPayService.createPaymentURL(
          orderUser,
          paymentType,
        );
        return {
          redirectUrl: returnUrl,
        };
      }
      if (paymentProvider === PaymentProvider.VNPAY) {
        const { returnUrl } = await this._vnPayService.createPaymentURL(
          orderUser,
        );
        return {
          redirectUrl: returnUrl,
        };
      }
    }
    //Thanh toán offline
    const orderExist = await this._orderRepository.findOne({
      where: {
        code: code,
      },
    });
    // console.log(orderExist);

    if (orderExist) {
      throw new RpcException('Đơn hàng đã được xử lý trước đó !');
    }

    await this._orderRepository.save(
      new OrderEntity({
        ...order,
      }),
    );
    //update totalSold product
    await Promise.all(
      items.map(async (item: any) => {
        const { id, quantity, name, image, price } = item;
        const product = await this._productRepository.findOneAndUpdate(
          { _id: convertToObjectId(id) },
          { $inc: { totalSold: quantity } },
        );
      }),
    );

    return { success: true };
  }
}
