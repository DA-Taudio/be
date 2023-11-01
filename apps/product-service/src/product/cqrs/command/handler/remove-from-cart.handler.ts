import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CartRepository } from '../../../cart.repository';
import { RpcException } from '@nestjs/microservices';
import { RemoveFromCartResponse } from '@app/proto-schema/proto/product.pb';
import { RemoveFromCartCommand } from '../iml';

@CommandHandler(RemoveFromCartCommand)
export class RemoveFromCartHandler
  implements ICommandHandler<RemoveFromCartCommand>
{
  constructor(private readonly cartRepository: CartRepository) {}
  async execute({ cmd, userId }: RemoveFromCartCommand): Promise<any> {
    const { _id } = cmd;
    const cart = await this.cartRepository.findById(_id);
    if (!cart) {
      throw new RpcException('Sản phẩm không tồn tại!');
    }

    await this.cartRepository.softDeleteById(_id);

    return { success: true } as RemoveFromCartResponse;
  }
}
