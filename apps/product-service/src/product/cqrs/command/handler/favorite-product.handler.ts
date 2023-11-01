import { BooleanPayload } from '@app/proto-schema/proto/base.pb';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { FavoriteProductCommand } from '../iml';
import { ProductFavoriteRepository } from '../../../product-favorite.repository';
import { ProductRepository } from '../../../product.repository';
import { ProductFavoriteEntity } from '@app/core';

@CommandHandler(FavoriteProductCommand)
export class FavoriteProductHandler
  implements ICommandHandler<FavoriteProductCommand>
{
  constructor(
    private readonly _productFavoriteRepository: ProductFavoriteRepository,
    private readonly _productRepository: ProductRepository,
  ) {}

  async execute({
    cmd,
    userId,
  }: FavoriteProductCommand): Promise<BooleanPayload> {
    const { productId } = cmd;

    const product = await this._productRepository.findById(productId);

    if (!product) throw new RpcException('Không tìm thấy sự kiện !');

    const existingFavorite = await this._productFavoriteRepository.findOne({
      productId,
      userId,
    });

    if (existingFavorite) {
      await this._productFavoriteRepository.findOneAndDelete({
        _id: existingFavorite._id,
      });
      // decrement total favorite
      await this._productRepository.decrementFavorite(product);
    } else {
      await this._productFavoriteRepository.save(
        new ProductFavoriteEntity({
          productId,
          userId,
        }),
      );
      // increment total favorite
      await this._productRepository.incrementFavorite(product);
    }

    return {
      success: true,
    };
  }
}
