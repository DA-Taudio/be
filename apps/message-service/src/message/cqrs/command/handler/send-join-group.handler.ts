import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendJoinGroupCommand } from '../iml';
import { SendJoinGroupResponse } from '@app/proto-schema/proto/message.pb';
import {
  ConfirmConversationRepository,
  ConversationRepository,
} from '../../../message.repository';
import { RpcException } from '@nestjs/microservices';
import { ConfirmConversationEntity, ConversationType } from '@app/core';

@CommandHandler(SendJoinGroupCommand)
export class SendJoinGroupHandler
  implements ICommandHandler<SendJoinGroupCommand>
{
  constructor(
    private readonly _confirmConversationRepository: ConfirmConversationRepository,
    private readonly _conversationRepository: ConversationRepository,
  ) {}

  async execute(command: SendJoinGroupCommand): Promise<SendJoinGroupResponse> {
    const { cmd, userId } = command;

    const conversation = await this._conversationRepository.findById(
      cmd.conversationId,
    );

    if (!conversation) {
      throw new RpcException('Nhóm chat không tồn tại !');
    }

    if (conversation.type === ConversationType.GROUP) {
      await this._confirmConversationRepository.save(
        new ConfirmConversationEntity({
          userId,
          conversationId: cmd.conversationId,
        }),
      );
      return { success: true } as SendJoinGroupResponse;
    }

    return { success: false } as SendJoinGroupResponse;
  }
}
