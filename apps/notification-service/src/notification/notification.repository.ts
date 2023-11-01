import { BaseRepository } from '@app/core';
import { NotificationEntity } from '@app/core/entities/notification';
import { EntityRepository } from 'typeorm';

@EntityRepository(NotificationEntity)
export class NotificationRepository extends BaseRepository<NotificationEntity> {}
