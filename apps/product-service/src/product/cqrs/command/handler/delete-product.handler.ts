import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteProductCommand } from '../iml';
import { ProductRepository } from '../../../product.repository';
import { DeleteProductResponse } from '@app/proto-schema/proto/product.pb';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute(command: DeleteProductCommand): Promise<DeleteProductResponse> {
    const { cmd } = command;

    const productExist = await this._productRepository.findById(cmd.productId);
    if (!productExist) {
      throw new RpcException('Sản phẩm không tồn tại !');
    }
    await this._productRepository.softDeleteById(cmd.productId);

    return {
      success: true,
    } as unknown as DeleteProductResponse;
  }
}
