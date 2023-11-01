import { NotificationEntity } from '@app/core/entities/notification';
import {
  NotificationServiceClient,
  NOTIFICATION_SERVICE_NAME,
} from '@app/proto-schema/proto/notification.pb';
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
  private notificationService: NotificationServiceClient;

  constructor(
    private notificationRepository: NotificationRepository,
    @Inject(NOTIFICATION_SERVICE_NAME)
    private readonly notificationClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.notificationService =
      this.notificationClient.getService<NotificationServiceClient>(
        NOTIFICATION_SERVICE_NAME,
      );
  }

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
