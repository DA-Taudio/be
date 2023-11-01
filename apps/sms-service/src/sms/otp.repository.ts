import { BaseRepository, OtpEntity } from '@app/core';
import { EntityRepository } from 'typeorm';

@EntityRepository(OtpEntity)
export class OtpRepository extends BaseRepository<OtpEntity> {}
