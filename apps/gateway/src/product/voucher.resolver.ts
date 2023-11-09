import { AppMetadata, BooleanPayload } from '@app/core';
import {
  ApplyVouchersRequest,
  CreateVoucherRequest,
  DeleteVoucherRequest,
  GetVoucherRequest,
  ListVoucherRequest,
  PRODUCT_SERVICE_NAME,
  ProductServiceClient,
  UpdateVoucherRequest,
} from '@app/proto-schema/proto/product.pb';
import { Inject } from '@nestjs/common';
import { Args, Query, Mutation } from '@nestjs/graphql';
import { ClientGrpc } from '@nestjs/microservices';
import {
  ApplyVouchersInput,
  CreateVoucherInput,
  ListVoucherInput,
  ReadVoucherInput,
  UpdateVoucherInput,
} from './input';
import {
  ApplyVouchersResponse,
  ListVoucherResponse,
  VoucherResponse,
} from './type';

export class VoucherResolver {
  private productService: ProductServiceClient;
  constructor(
    @Inject(PRODUCT_SERVICE_NAME) private readonly productClient: ClientGrpc,
    private readonly metadata: AppMetadata,
  ) {
    this.productService =
      productClient.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Mutation(() => ApplyVouchersResponse)
  async applyVouchers(@Args('input') input: ApplyVouchersInput) {
    return await this.productService.applyVouchers(
      input as ApplyVouchersRequest,
    );
  }

  @Mutation(() => VoucherResponse)
  async createVoucher(@Args('input') input: CreateVoucherInput) {
    return await this.productService.createVoucher(
      input as CreateVoucherRequest,
    );
  }

  @Mutation(() => BooleanPayload)
  async updateVoucher(@Args('input') input: UpdateVoucherInput) {
    return await this.productService.updateVoucher(
      input as UpdateVoucherRequest,
    );
  }

  @Mutation(() => BooleanPayload)
  async deleteVoucher(@Args('input') input: ReadVoucherInput) {
    return await this.productService.deleteVoucher(
      input as DeleteVoucherRequest,
    );
  }
  @Query(() => ListVoucherResponse)
  async listVoucher(@Args('input') input: ListVoucherInput) {
    return await this.productService.listVoucher(input as ListVoucherRequest);
  }

  @Query(() => VoucherResponse)
  async getVoucher(@Args('input') input: ReadVoucherInput) {
    return await this.productService.getVoucher(input as GetVoucherRequest);
  }
}
