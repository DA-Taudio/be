import { BaseRepository } from '@app/core';
import { CartEntity } from '@app/core/entities/cart';
import { EntityRepository } from 'typeorm';

@EntityRepository(CartEntity)
export class CartRepository extends BaseRepository<CartEntity> {}
