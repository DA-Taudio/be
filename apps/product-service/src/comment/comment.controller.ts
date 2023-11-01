import { AppMetadata, PUB_SUB } from '@app/core';
import { Metadata } from '@grpc/grpc-js';
import { Controller, Inject } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { CreateCommentCommand } from './cqrs/commands';
import {
  CreateCommentRequest,
  CreateCommentResponse,
  ListCommentRequest,
  ListCommentResponse,
  ListFeedbackRequest,
  PRODUCT_SERVICE_NAME,
} from '@app/proto-schema/proto/product.pb';
import { ListCommentQuery } from './cqrs/query';
import { ListFeedbackQuery } from './cqrs/query/impl/list-feedback.query';

@Controller()
export class CommentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'createComment')
  async createComment(
    request: CreateCommentRequest,
    metadata: Metadata,
  ): Promise<CreateCommentResponse> {
    const comment = await this.commandBus.execute(
      new CreateCommentCommand(request, this.appMetadata.getUserId(metadata)),
    );

    this.pubSub.publish('COMMENT_CREATED', {
      onCommentCreated: {
        comment,
      },
    });

    return comment;
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'ListComment')
  async listComment(request: ListCommentRequest): Promise<ListCommentResponse> {
    return await this.queryBus.execute(new ListCommentQuery(request));
  }

  @GrpcMethod(PRODUCT_SERVICE_NAME, 'ListFeedback')
  async listFeedback(
    request: ListFeedbackRequest,
  ): Promise<ListCommentResponse> {
    return await this.queryBus.execute(new ListFeedbackQuery(request));
  }
}
