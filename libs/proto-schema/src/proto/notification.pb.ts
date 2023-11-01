/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { SortDirection } from './base.pb';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'notification';

export interface CreateNotificationRequest {
  senderId: string;
  receiverId: string[];
  content: string;
  referenceId: string;
}

export interface CreateNotificationResponse {
  _id: string;
  senderId: string;
  receiverId: string[];
  content: string;
  isRead: boolean;
  /** Base fields */
  createdAt: number;
  updatedAt: number;
  updatedBy: string;
  deletedBy: string;
  deletedAt: number;
  createdBy: string;
  referenceId: string;
}

export interface PaginationResponse {
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface PaginationInput {
  page: number;
  limit: number;
  after: string;
  before: string;
}

export interface ListNotificationRequest {
  sort: ListNotificationRequest_SortNotification | undefined;
  pagination: PaginationInput | undefined;
}

export interface ListNotificationRequest_SortNotification {
  createdAt: SortDirection;
}

export interface ListNotificationResponse {
  data: CreateNotificationResponse[];
  totalItem: number;
  pagination: PaginationResponse | undefined;
}

export interface ChangeStatusReadRequest {
  id: string[];
}

export interface ChangeStatusReadResponse {
  success: boolean;
}

export const NOTIFICATION_PACKAGE_NAME = 'notification';

export interface NotificationServiceClient {
  createNotification(
    request: CreateNotificationRequest,
    metadata?: Metadata,
  ): Observable<CreateNotificationResponse>;

  getListNotification(
    request: ListNotificationRequest,
    metadata?: Metadata,
  ): Observable<ListNotificationResponse>;

  changeStatusRead(
    request: ChangeStatusReadRequest,
    metadata?: Metadata,
  ): Observable<ChangeStatusReadResponse>;
}

export interface NotificationServiceController {
  createNotification(
    request: CreateNotificationRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateNotificationResponse>
    | Observable<CreateNotificationResponse>
    | CreateNotificationResponse;

  getListNotification(
    request: ListNotificationRequest,
    metadata?: Metadata,
  ):
    | Promise<ListNotificationResponse>
    | Observable<ListNotificationResponse>
    | ListNotificationResponse;

  changeStatusRead(
    request: ChangeStatusReadRequest,
    metadata?: Metadata,
  ):
    | Promise<ChangeStatusReadResponse>
    | Observable<ChangeStatusReadResponse>
    | ChangeStatusReadResponse;
}

export function NotificationServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'createNotification',
      'getListNotification',
      'changeStatusRead',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('NotificationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('NotificationService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const NOTIFICATION_SERVICE_NAME = 'NotificationService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
