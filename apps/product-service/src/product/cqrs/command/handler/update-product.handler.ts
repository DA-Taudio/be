import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProductCommand } from '../iml';
import { ProductRepository } from '../../../product.repository';
import { UpdateProductResponse } from '@app/proto-schema/proto/product.pb';
import { ProductEntity } from '@app/core';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(UpdateProductCommand)
export class UpdateProductHandler
  implements ICommandHandler<UpdateProductCommand>
{
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute({ cmd }: UpdateProductCommand): Promise<UpdateProductResponse> {
    const { productId, updateInput } = cmd;

    const product = await this._productRepository.findById(productId);
    if (!product) throw new RpcException('Sản phẩm không tồn tại !');

    const { value } = await this._productRepository.findOneAndUpdate(
      { _id: product._id },
      { $set: { ...updateInput } },
      { returnOriginal: false },
    );
    return {
      success: true,
    } as unknown as UpdateProductResponse;
  }
}
