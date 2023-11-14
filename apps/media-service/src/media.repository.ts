import { BaseRepository, MediaEntity, SliderEntity } from '@app/core';
import { EntityRepository, MongoRepository } from 'typeorm';
@EntityRepository(MediaEntity)
export class MediaRepository extends MongoRepository<MediaEntity> {}
@EntityRepository(SliderEntity)
export class SliderRepository extends BaseRepository<SliderEntity> {}
