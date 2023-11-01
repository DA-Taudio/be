import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendMessageCommand } from '../iml';
import { SendMessageResponse } from '@app/proto-schema/proto/message.pb';
import { MessageRepository } from '../../../message.repository';
import { MessageEntity } from '@app/core';

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
  constructor(private readonly _messageRepository: MessageRepository) {}

  async execute(command: SendMessageCommand): Promise<SendMessageResponse> {
    const { cmd } = command;
    const result = await this._messageRepository.save(new MessageEntity(cmd));

    return { success: true } as SendMessageResponse;
  }
}
