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
      discountAmount,
      amount,
      code,
      description,
      items,
      paymentMethod,
      paymentType,
      paymentProvider,
      shippingAddress,
      infoCouponCode,
    } = cmd;

    const amountAfterDiscount = amount - discountAmount;

    const order = {
      amount: amountAfterDiscount,
      description: description || `Mua đồ audio`,
      code,
      items,
      userId,
      discountAmount,
      subTotal: amount,
      paymentMethod,
      shippingStatus: ShippingStatus.NOT_SHIPPED,
      shippingAddress,
      infoCouponCode,
    };
    await Promise.all(
      items.map(async (item: any) => {
        const { id, quantity, name, image, price } = item;
        const product = await this._productRepository.findById(id);

        if (product?.countInStock < quantity) {
          throw new RpcException(
            'Số lượng sản phẩm trong kho không đủ tạo đơn hàng !',
          );
        }
      }),
    );

    //Thanh toán online
    if (paymentMethod === PaymentMethod.ONLINE && amount > 0) {
      const orderOn = await this._orderRepository.save(
        new OrderEntity({ ...order }),
      );

      if (paymentProvider === PaymentProvider.ZALOPAY) {
        const { returnUrl } = await this._zaloPayService.createPaymentURL(
          orderOn,
          paymentType,
        );
        return {
          orderId: orderOn._id,
          redirectUrl: returnUrl,
        };
      }
      if (paymentProvider === PaymentProvider.VNPAY) {
        const { returnUrl } = await this._vnPayService.createPaymentURL(
          orderOn,
        );
        return {
          orderId: orderOn._id,
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

    const orderOff = await this._orderRepository.save(
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
          {
            $inc: {
              totalSold: quantity,
              countInStock: -quantity,
            },
          },
        );
      }),
    );

    return {
      orderId: orderOff._id,
      success: true,
    };
  }
}
