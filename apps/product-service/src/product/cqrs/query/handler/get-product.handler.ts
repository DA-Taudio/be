import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetProductQuery } from '../iml';
import { GetProductResponse } from '@app/proto-schema/proto/product.pb';
import { ProductRepository } from '../../../product.repository';
import { RpcException } from '@nestjs/microservices';

@QueryHandler(GetProductQuery)
export class GetProductHandler implements IQueryHandler<GetProductQuery> {
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute({ query }: GetProductQuery): Promise<GetProductResponse> {
    const product = await this._productRepository.findById(query.productId);
    if (!product) {
      throw new RpcException('Sản phẩm không tồn tại !');
    }

    return {
      product,
    } as unknown as GetProductResponse;
  }
}
