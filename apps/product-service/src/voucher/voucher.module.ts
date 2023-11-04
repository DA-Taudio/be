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

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TypeEntity,
      VoucherRepository,
      HistoryVoucherEntity,
      HistoryVoucherRepository,
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
