import { BaseRepository, CommentEntity, ProductEntity } from '@app/core';
import { EntityRepository } from 'typeorm';

@EntityRepository(CommentEntity)
export class CommentRepository extends BaseRepository<CommentEntity> {}

@EntityRepository(ProductEntity)
export class ProductRepository extends BaseRepository<ProductEntity> {}
