import { ChangeStatusReadResponse } from '@app/proto-schema/proto/notification.pb';
import { convertToObjectId } from '@app/utils';
import { Logger } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeStatusReadCommand } from '../impl';
import { NotificationRepository } from '../../../notification.repository';

@CommandHandler(ChangeStatusReadCommand)
export class ChangeStatusReadHandler
  implements ICommandHandler<ChangeStatusReadCommand>
{
  logger = new Logger(this.constructor.name);

  constructor(private notificationRepository: NotificationRepository) {}
  async execute(
    command: ChangeStatusReadCommand,
  ): Promise<ChangeStatusReadResponse> {
    const { cmd } = command;
    const { id } = cmd;

    for (const item of id) {
      if (item) {
        await this.notificationRepository.findOneAndUpdate(
          { _id: convertToObjectId(item) },
          { $set: { isRead: true } },
        );
      }
    }

    return { success: true };
  }
}
