import { NotificationEntity } from '@app/core/entities/notification';

import { Inject, Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientGrpc } from '@nestjs/microservices';
import { CreateNotificationCommand } from '../impl';
import { NotificationRepository } from '../../../notification.repository';

@CommandHandler(CreateNotificationCommand)
export class CreateNotificationHandler
  implements ICommandHandler<CreateNotificationCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(private notificationRepository: NotificationRepository) {}

  async execute(command: CreateNotificationCommand): Promise<any> {
    const { cmd } = command;
    const { senderId, receiverId, content, referenceId } = cmd;
    const notification = new NotificationEntity({
      senderId,
      receiverId,
      content,
      referenceId,
      isRead: false,
    } as any);
    const newNotification = await this.notificationRepository.save(
      notification,
    );

    return newNotification;
  }
}
