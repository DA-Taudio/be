import {
  AppMetadata,
  FindNoSQL,
  HistoryVoucherEntity,
  TypeEntity,
} from '@app/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoucherCommandHandlers } from './command';
import { VoucherQueryHandlers } from './query';
import {
  HistoryVoucherRepository,
  VoucherRepository,
} from './voucher.repository';
import { VoucherController } from './voucher.controller';
import { ProductRepository } from '../product/product.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeEntity,
      VoucherRepository,
      HistoryVoucherEntity,
      HistoryVoucherRepository,
      ProductRepository,
    ]),
  ],
  controllers: [VoucherController],
  providers: [
    FindNoSQL,
    ...VoucherCommandHandlers,
    ...VoucherQueryHandlers,
    AppMetadata,
  ],
})
export class VoucherModule {}
