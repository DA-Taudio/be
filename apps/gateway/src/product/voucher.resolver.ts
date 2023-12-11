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
import { Inject, UseGuards } from '@nestjs/common';
import {
  Args,
  Query,
  Mutation,
  Context,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
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
  ProductPayload,
  VoucherResponse,
} from './type';
import { AuthenticationGuard } from '../auth/guards';
import { IGraphQLContext } from '@app/core/interfaces';
import { firstValueFrom } from 'rxjs';
@Resolver(() => VoucherResponse)
export class VoucherResolver {
  private productService: ProductServiceClient;

  constructor(
    @Inject(PRODUCT_SERVICE_NAME) private readonly _productClient: ClientGrpc,
    private readonly metadata: AppMetadata,
  ) {
    this.productService =
      this._productClient.getService<ProductServiceClient>(
        PRODUCT_SERVICE_NAME,
      );
  }

  @Mutation(() => ApplyVouchersResponse)
  @UseGuards(AuthenticationGuard)
  async applyVouchers(
    @Args('input') input: ApplyVouchersInput,
    @Context() context: any,
  ) {
    const { _id } = context.req.user;

    return await this.productService.applyVouchers(
      input as ApplyVouchersRequest,
      this.metadata.setUserId(_id),
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

  @ResolveField('countHistory', () => Number, { nullable: true })
  async countHistory(
    @Parent() voucher: VoucherResponse,
    @Context() { loaders }: IGraphQLContext,
  ) {
    const data = await firstValueFrom(
      this.productService.countHistoryVoucher({
        voucherId: voucher._id.toString(),
      }),
    );

    return data?.total || 0;
  }

  @ResolveField('products', () => [ProductPayload], { nullable: true })
  async products(
    @Parent() voucher: VoucherResponse,
    @Context() { loaders }: IGraphQLContext,
  ) {
    if (voucher?.productIds) {
      return loaders.productsLoader.loadMany(voucher?.productIds);
    }
    return null;
  }
}
