import { MediaEntity } from '@app/core';
import { EntityRepository, MongoRepository } from 'typeorm';
@EntityRepository(MediaEntity)
export class MediaRepository extends MongoRepository<MediaEntity> {}
