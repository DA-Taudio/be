import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CartRepository } from '../../../cart.repository';
import { RpcException } from '@nestjs/microservices';
import { RemoveFromCartResponse } from '@app/proto-schema/proto/product.pb';
import { ClearCartCommand } from '../iml';

@CommandHandler(ClearCartCommand)
export class ClearCartHandler implements ICommandHandler<ClearCartCommand> {
  constructor(private readonly cartRepository: CartRepository) {}
  async execute({ cmd, userId }: ClearCartCommand): Promise<any> {
    await this.cartRepository.updateMany(
      {
        userId,
        deletedAt: null,
      },
      {
        $set: {
          deletedAt: new Date(),
        },
      },
    );

    return { success: true } as RemoveFromCartResponse;
  }
}
