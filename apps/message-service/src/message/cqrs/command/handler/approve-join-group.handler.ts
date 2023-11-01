import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ApproveJoinGroupCommand } from '../iml';
import { ApproveJoinGroupResponse } from '@app/proto-schema/proto/message.pb';
import {
  ConfirmConversationRepository,
  ConversationRepository,
} from '../../../message.repository';
import { convertToObjectId } from '@app/utils';
import { ConfirmationStatus } from '@app/core';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(ApproveJoinGroupCommand)
export class ApproveJoinGroupHandler
  implements ICommandHandler<ApproveJoinGroupCommand>
{
  constructor(
    private readonly _confirmConversationRepository: ConfirmConversationRepository,
    private readonly _conversationRepository: ConversationRepository,
  ) {}

  async execute(
    command: ApproveJoinGroupCommand,
  ): Promise<ApproveJoinGroupResponse> {
    const { cmd, ownerId } = command;
    const confirmConversation =
      await this._confirmConversationRepository.findOne({
        where: {
          conversationId: convertToObjectId(cmd.conversationId),
          userId: convertToObjectId(cmd.userId),
        },
      });

    if (confirmConversation.status === ConfirmationStatus.APPROVED) {
      throw new RpcException('Yêu cầu tham gia đã nhóm chat đã được duyệt');
    } else if (confirmConversation.status === ConfirmationStatus.REJECTED) {
      throw new RpcException('Yêu cầu tham gia đã nhóm chat đã bị từ chối');
    } else {
    }
    return { success: false };
  }
}
