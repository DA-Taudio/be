import { AppMetadata } from '@app/core';
import {
  ChangeStatusReadRequest,
  ChangeStatusReadResponse,
  CreateNotificationRequest,
  CreateNotificationResponse,
  ListNotificationRequest,
  ListNotificationResponse,
  NOTIFICATION_SERVICE_NAME,
} from '@app/proto-schema/proto/notification.pb';
import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ChangeStatusReadCommand,
  CreateNotificationCommand,
} from './cqrs/commands/impl';
import { GetListNotificationQuery } from './cqrs/query';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
  ) {}

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'createNotification')
  async create(
    request: CreateNotificationRequest,
  ): Promise<CreateNotificationResponse> {
    return await this.commandBus.execute(
      new CreateNotificationCommand({
        ...request,
      }),
    );
  }
  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'getListNotification')
  async getListNotification(
    request: ListNotificationRequest,
    metadata: Metadata,
  ): Promise<ListNotificationResponse> {
    return await this.queryBus.execute(
      new GetListNotificationQuery(
        request,
        this.appMetadata.getUserId(metadata),
      ),
    );
  }

  @GrpcMethod(NOTIFICATION_SERVICE_NAME, 'changeStatusRead')
  async changeStatusRead(
    request: ChangeStatusReadRequest,
  ): Promise<ChangeStatusReadResponse> {
    return await this.commandBus.execute(new ChangeStatusReadCommand(request));
  }
}
