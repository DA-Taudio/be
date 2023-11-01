import { OrderEntity } from '@app/core/entities/cart';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './order.repository';
import { PaymentController } from './payment.controller';
import { PaymentCommandHandlers } from './cqrs/command';
import { ProductRepository } from '../product/product.repository';
import { AppMetadata, ProductEntity } from '@app/core';
import { ZaloPayService } from './zalopay.service';
import { VNPayService } from './vnpay.service';
import { PaymentQueryHandlers } from './cqrs/query';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderRepository,
      ProductRepository,
      ProductEntity,
    ]),
  ],
  controllers: [PaymentController],
  providers: [
    ...PaymentCommandHandlers,
    ...PaymentQueryHandlers,
    ZaloPayService,
    VNPayService,
    AppMetadata,
  ],
})
export class PaymentModule {}
