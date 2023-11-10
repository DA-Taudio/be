import { BaseRepository, HistoryVoucherEntity, ProductEntity } from '@app/core';
import { EntityRepository } from 'typeorm';
@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {
  async incrementFavorite(product: ProductEntity) {
    return await this.updateOne(
      { _id: product._id },
      { $set: { totalLike: product.totalLike + 1 } },
    );
  }

  async decrementFavorite(product: ProductEntity) {
    if (product.totalLike <= 0) {
      return;
    }
    return await this.updateOne(
      { _id: product._id },
      { $set: { totalLike: product.totalLike - 1 } },
    );
  }
}
