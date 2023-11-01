import { BaseRepository, ProductFavoriteEntity } from '@app/core';
import { EntityRepository } from 'typeorm';

@EntityRepository(ProductFavoriteEntity)
export class ProductFavoriteRepository extends BaseRepository<ProductFavoriteEntity> {}
