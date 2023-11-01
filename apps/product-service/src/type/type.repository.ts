import { BaseRepository, TypeEntity } from '@app/core';
import { EntityRepository } from 'typeorm';
@EntityRepository(TypeEntity)
export class TypeRepository extends BaseRepository<TypeEntity> {}
