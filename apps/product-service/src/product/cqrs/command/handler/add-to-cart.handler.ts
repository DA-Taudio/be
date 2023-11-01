import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CartRepository } from '../../../cart.repository';
import { CartEntity } from '@app/core/entities/cart';
import { AddToCartResponse } from '@app/proto-schema/proto/product.pb';
import { AddToCartCommand } from '../iml';
import { ProductRepository } from '../../../product.repository';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(AddToCartCommand)
export class AddToCartHandler implements ICommandHandler<AddToCartCommand> {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productRepository: ProductRepository,
  ) {}
  async execute({ cmd, userId }: AddToCartCommand): Promise<any> {
    const { productId, quantity } = cmd;
    const product = await this.productRepository.findById(productId);

    const cart = await this.cartRepository.findOne({
      where: {
        productId,
        deletedAt: null,
      },
    });
    if (cart) {
      await this.cartRepository.findOneAndUpdate(
        {
          productId,
          userId,
          deletedAt: null,
        },
        {
          $inc: { quantity: quantity },
          $set: { price: product.price },
        },
      );
      return { success: true } as AddToCartResponse;
    }

    await this.cartRepository.save(
      new CartEntity({ ...cmd, userId, price: product.price }),
    );

    return { success: true } as AddToCartResponse;
  }
}
