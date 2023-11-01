import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppMetadata, FindNoSQL, NotificationEntity } from '@app/core';
import { NotificationController } from './notification.controller';
import { NotificationRepository } from './notification.repository';
import { NotificationCommandHandlers } from './cqrs/commands/handlers';
import { NotificationQueryHandlers } from './cqrs/query';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationRepository, NotificationEntity]),
  ],
  controllers: [NotificationController],
  providers: [
    ...NotificationCommandHandlers,
    ...NotificationQueryHandlers,
    AppMetadata,
    FindNoSQL,
  ],
})
export class NotificationModule {}
