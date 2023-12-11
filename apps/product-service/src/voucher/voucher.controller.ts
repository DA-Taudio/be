import { AppMetadata } from '@app/core';
import {
  ApplyVouchersRequest,
  CountHistoryVoucherRequest,
  CreateHistoryVoucherRequest,
  CreateVoucherRequest,
  DeleteHistoryVoucherRequest,
  DeleteVoucherRequest,
  ListVoucherRequest,
  PRODUCT_SERVICE_NAME,
  UpdateVoucherRequest,
} from '@app/proto-schema/proto/product.pb';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ApplyVouchersCommand,
  CountHistoryVoucherCommand,
  CreateHistoryVoucherCommand,
  CreateVoucherCommand,
  DeleteHistoryVoucherCommand,
  DeleteVoucherCommand,
  UpdateVoucherCommand,
} from './command';
import { ListVoucherQuery } from './query';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class VoucherController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
  ) {}
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'createVoucher')
  async createVoucher(input: CreateVoucherRequest) {
    return await this.commandBus.execute(new CreateVoucherCommand(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'updateVoucher')
  async updateVoucher(input: UpdateVoucherRequest) {
    return await this.commandBus.execute(new UpdateVoucherCommand(input));
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'listVoucher')
  async listVoucher(input: ListVoucherRequest) {
    return await this.queryBus.execute(new ListVoucherQuery(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'deleteVoucher')
  async deleteVoucher(input: DeleteVoucherRequest) {
    return await this.commandBus.execute(new DeleteVoucherCommand(input));
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'applyVouchers')
  async applyVouchers(input: ApplyVouchersRequest, metadata: Metadata) {
    return await this.commandBus.execute(
      new ApplyVouchersCommand(input, this.appMetadata.getUserId(metadata)),
    );
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'createHistoryVoucher')
  async createHistoryVoucher(input: CreateHistoryVoucherRequest) {
    return await this.commandBus.execute(
      new CreateHistoryVoucherCommand(input),
    );
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'deleteHistoryVoucher')
  async deleteHistoryVoucher(input: DeleteHistoryVoucherRequest) {
    return await this.commandBus.execute(
      new DeleteHistoryVoucherCommand(input),
    );
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'countHistoryVoucher')
  async countHistoryVoucher(input: CountHistoryVoucherRequest) {
    return await this.commandBus.execute(new CountHistoryVoucherCommand(input));
  }
}
