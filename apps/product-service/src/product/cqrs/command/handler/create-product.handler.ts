import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../iml';
import { ProductRepository } from '../../../product.repository';
import { CreateProductResponse } from '@app/proto-schema/proto/product.pb';
import { ProductEntity } from '@app/core';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute(command: CreateProductCommand): Promise<CreateProductResponse> {
    const { cmd } = command;
    const productExist = await this._productRepository.findOne({
      where: {
        name: cmd.name,
        $or: [
          { deletedAt: null },
          {
            deletedAt: { $gt: new Date() },
          },
        ],
      },
    });
    if (productExist) {
      throw new RpcException('Sản phẩm đã tồn tại !');
    }
    await this._productRepository.save(
      new ProductEntity(cmd as unknown as ProductEntity),
    );

    return {
      success: true,
    } as unknown as CreateProductResponse;
  }
}
