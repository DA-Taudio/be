import { AppMetadata } from '@app/core';
import {
  AddToCartRequest,
  AnalyticRequest,
  ClearCartRequest,
  CreateProductRequest,
  DeleteProductRequest,
  FavoriteProductRequest,
  GetListProductRequest,
  GetProductRequest,
  IsFavoriteProductRequest,
  ListCartRequest,
  ListProductByIdsRequest,
  PRODUCT_SERVICE_NAME,
  RemoveFromCartRequest,
  UpdateProductRequest,
} from '@app/proto-schema/proto/product.pb';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  AddToCartCommand,
  ClearCartCommand,
  CreateProductCommand,
  DeleteProductCommand,
  FavoriteProductCommand,
  RemoveFromCartCommand,
  UpdateProductCommand,
} from './cqrs/command';
import {
  AnalyticQuery,
  GetListProductQuery,
  GetProductQuery,
  IsFavoriteProductQuery,
  ListCartQuery,
  ListProductByIdsQuery,
} from './cqrs/query';
import { Metadata } from '@grpc/grpc-js';
import { BooleanPayload } from '@app/proto-schema/proto/base.pb';

@Controller()
export class ProductController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
  ) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'CreateProduct')
  async createProduct(input: CreateProductRequest) {
    return await this.commandBus.execute(new CreateProductCommand(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'UpdateProduct')
  async updateProduct(input: UpdateProductRequest) {
    return await this.commandBus.execute(new UpdateProductCommand(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'DeleteProduct')
  async deleteProduct(input: DeleteProductRequest) {
    return await this.commandBus.execute(new DeleteProductCommand(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'GetProduct')
  async getProduct(input: GetProductRequest) {
    return await this.queryBus.execute(new GetProductQuery(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'GetListProduct')
  async getListProduct(input: GetListProductRequest) {
    return await this.queryBus.execute(new GetListProductQuery(input));
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'ListProductByIds')
  async listProductByIds(input: ListProductByIdsRequest) {
    return await this.queryBus.execute(new ListProductByIdsQuery(input));
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'favoriteProduct')
  async favoriteProduct(
    request: FavoriteProductRequest,
    metadata: Metadata,
  ): Promise<BooleanPayload> {
    return await this.commandBus.execute(
      new FavoriteProductCommand(request, this.appMetadata.getUserId(metadata)),
    );
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'isFavoriteProduct')
  async isFavoriteProduct(
    request: IsFavoriteProductRequest,
    metadata: Metadata,
  ): Promise<BooleanPayload> {
    return await this.queryBus.execute(
      new IsFavoriteProductQuery(request, this.appMetadata.getUserId(metadata)),
    );
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'AddToCart')
  async AddToCart(input: AddToCartRequest, metadata: Metadata) {
    return await this.commandBus.execute(
      new AddToCartCommand(input, this.appMetadata.getUserId(metadata)),
    );
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'RemoveFromCart')
  async RemoveFromCart(input: RemoveFromCartRequest, metadata: Metadata) {
    return await this.commandBus.execute(
      new RemoveFromCartCommand(input, this.appMetadata.getUserId(metadata)),
    );
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'ListCart')
  async ListCart(input: ListCartRequest, metadata: Metadata) {
    return await this.queryBus.execute(
      new ListCartQuery(input, this.appMetadata.getUserId(metadata)),
    );
  }
  @GrpcMethod(PRODUCT_SERVICE_NAME, 'clearCart')
  async clearCart(input: ClearCartRequest, metadata: Metadata) {
    return await this.commandBus.execute(
      new ClearCartCommand(input, this.appMetadata.getUserId(metadata)),
    );
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'analytic')
  async analytic(input: AnalyticRequest) {
    return await this.queryBus.execute(new AnalyticQuery(input));
  }
}
