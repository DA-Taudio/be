import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateConversationCommand } from '../iml';
import { CreateConversationResponse } from '@app/proto-schema/proto/message.pb';
import { ConversationRepository } from '../../../message.repository';
import { ConversationEntity, ConversationType } from '@app/core';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(CreateConversationCommand)
export class CreateConversationHandler
  implements ICommandHandler<CreateConversationCommand>
{
  constructor(
    private readonly _conversationRepository: ConversationRepository,
  ) {}

  async execute({
    cmd,
    userId,
  }: CreateConversationCommand): Promise<CreateConversationResponse> {
    const { name, type } = cmd;
    if (type === ConversationType.PERSONAL) {
      const conversationExit = await this._conversationRepository.findOne({
        where: {
          name: name,
        },
      });

      if (!conversationExit) {
        const members = this.splitCombinedId(name);

        const conversationPersonal = await this._conversationRepository.save(
          new ConversationEntity({
            name,
            type,
            members: members,
          }),
        );
        return {
          conversation: conversationPersonal,
        } as unknown as CreateConversationResponse;
      }

      return {
        conversation: conversationExit,
      } as unknown as CreateConversationResponse;
    }

    const conversationGroup = await this._conversationRepository.save(
      new ConversationEntity({
        name,
        type,
        ownerId: userId,
      }),
    );

    return {
      conversation: conversationGroup,
    } as unknown as CreateConversationResponse;
  }

  splitCombinedId(combinedId) {
    const objectIdLength = 24; // độ dài của một ObjectId (dưới dạng chuỗi)
    const id1 = combinedId.substr(0, objectIdLength);
    const id2 = combinedId.substr(objectIdLength, objectIdLength);
    return [id1, id2];
  }
}
