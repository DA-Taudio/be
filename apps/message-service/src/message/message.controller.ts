import { AppMetadata } from '@app/core';
import {
  CreateConversationRequest,
  ListConversationRequest,
  ListMessageRequest,
  MESSAGE_SERVICE_NAME,
  SendJoinGroupRequest,
  SendMessageRequest,
} from '@app/proto-schema/proto/message.pb';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateConversationCommand,
  SendJoinGroupCommand,
  SendMessageCommand,
} from './cqrs/command';
import { Metadata } from '@grpc/grpc-js';
import { ListConversationQuery, ListMessageQuery } from './cqrs/query/iml';

@Controller()
export class MessageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
  ) {}

  @GrpcMethod(MESSAGE_SERVICE_NAME, 'CreateConversation')
  async createConversation(
    input: CreateConversationRequest,
    metadata: Metadata,
  ) {
    return await this.commandBus.execute(
      new CreateConversationCommand(
        input,
        this.appMetadata.getUserId(metadata),
      ),
    );
  }

  @GrpcMethod(MESSAGE_SERVICE_NAME, 'SendMessage')
  async sendMessage(input: SendMessageRequest) {
    return await this.commandBus.execute(new SendMessageCommand(input));
  }

  @GrpcMethod(MESSAGE_SERVICE_NAME, 'SendJoinGroup')
  async sendJoinGroup(input: SendJoinGroupRequest, metadata: Metadata) {
    return await this.commandBus.execute(
      new SendJoinGroupCommand(input, this.appMetadata.getUserId(metadata)),
    );
  }
  @GrpcMethod(MESSAGE_SERVICE_NAME, 'ListConversation')
  async listConversation(input: ListConversationRequest) {
    return await this.queryBus.execute(new ListConversationQuery(input));
  }

  @GrpcMethod(MESSAGE_SERVICE_NAME, 'ListMessage')
  async listMessage(input: ListMessageRequest) {
    return await this.queryBus.execute(new ListMessageQuery(input));
  }
}
