import { AppMetadata } from '@app/core';
import {
  CreateVoucherRequest,
  DeleteVoucherRequest,
  ListVoucherRequest,
  PRODUCT_SERVICE_NAME,
} from '@app/proto-schema/proto/product.pb';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateVoucherCommand, DeleteVoucherCommand } from './command';
import { ListVoucherQuery } from './query';

@Controller()
export class VoucherController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
  ) {}
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateVoucher')
  async createVoucher(input: CreateVoucherRequest) {
    return await this.commandBus.execute(new CreateVoucherCommand(input));
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'ListVoucher')
  async listVoucher(input: ListVoucherRequest) {
    return await this.queryBus.execute(new ListVoucherQuery(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'DeleteVoucher')
  async deleteVoucher(input: DeleteVoucherRequest) {
    return await this.commandBus.execute(new DeleteVoucherCommand(input));
  }
}
