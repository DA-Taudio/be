import { AppMetadata } from '@app/core';
import {
  CreateConversationResponse,
  ListConversationResponse,
  ListMessageRequest,
  ListMessageResponse,
  MESSAGE_SERVICE_NAME,
  MessageServiceClient,
  SendMessageResponse,
} from '@app/proto-schema/proto/message.pb';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateConversationInput,
  ListConversationInput,
  ListMessageInput,
  SendMessageInput,
} from './input';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MessageService {
  private _messageService: MessageServiceClient;

  constructor(
    @Inject(MESSAGE_SERVICE_NAME) private readonly _messageClient: ClientGrpc,
    private readonly metadata: AppMetadata,
  ) {
    this._messageService =
      this._messageClient.getService<MessageServiceClient>(
        MESSAGE_SERVICE_NAME,
      );
  }

  async createConversation(
    input: CreateConversationInput,
    userId: string,
  ): Promise<CreateConversationResponse> {
    const { conversation } = await firstValueFrom(
      this._messageService.createConversation(
        input,
        this.metadata.setUserId(userId),
      ),
    );
    return { conversation };
  }

  async listConversation(
    input: ListConversationInput,
  ): Promise<ListConversationResponse> {
    const { data } = await firstValueFrom(
      this._messageService.listConversation(input),
    );
    return { data };
  }

  async sendMessage(input: SendMessageInput): Promise<SendMessageResponse> {
    const { success } = await firstValueFrom(
      this._messageService.sendMessage(input),
    );
    return { success };
  }

  async listMessage(input: ListMessageInput): Promise<ListMessageResponse> {
    const { data } = await firstValueFrom(
      this._messageService.listMessage(input as ListMessageRequest),
    );
    return { data };
  }
}
