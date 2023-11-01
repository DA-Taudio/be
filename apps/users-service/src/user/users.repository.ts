import { AdminEntity, BaseRepository, UserEntity } from '@app/core';
import { EntityRepository } from 'typeorm';
@EntityRepository(AdminEntity)
export class AdminRepository extends BaseRepository<AdminEntity> {}

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
