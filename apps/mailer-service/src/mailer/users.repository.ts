import { AdminEntity, BaseRepository, UserEntity } from '@app/core';
import { EntityRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
