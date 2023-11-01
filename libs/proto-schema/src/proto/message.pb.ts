/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { PaginationInput } from './base.pb';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'message';

/** Enum */
export enum ConversationType {
  PERSONAL = 'PERSONAL',
  GROUP = 'GROUP',
}

export interface SendMessageRequest {
  content: string;
  conversationId: string;
  senderId: string;
}

export interface SendMessageResponse {
  success: boolean;
}

export interface CreateConversationRequest {
  name: string;
  type: ConversationType;
}

export interface CreateConversationResponse {
  conversation: Conversation | undefined;
}

export interface DeleteConversationRequest {
  conversationId: string;
}

export interface DeleteConversationResponse {
  success: boolean;
}

export interface SendJoinGroupRequest {
  conversationId: string;
}

export interface SendJoinGroupResponse {
  success: boolean;
}

export interface ApproveJoinGroupRequest {
  userId: string;
  conversationId: string;
}

export interface ApproveJoinGroupResponse {
  success: boolean;
}

export interface RejectJoinGroupRequest {
  userId: string;
  conversationId: string;
}

export interface RejectJoinGroupResponse {
  success: boolean;
}

export interface LeaveGroupRequest {
  userId: string;
  conversationId: string;
}

export interface LeaveGroupResponse {
  success: boolean;
}

export interface message {
  _id: string;
  content: string;
  senderId: string;
  conversationId: string;
  /** base */
  createdAt: number;
  createdBy: number;
  updatedAt: number;
  updatedBy: number;
  deletedBy: string;
  deletedAt: number;
}

export interface Conversation {
  _id: string;
  name: string;
  members: string[];
  ownerId: string;
  type: ConversationType;
  /** base */
  createdAt: number;
  createdBy: string;
  updatedAt: number;
  updatedBy: string;
  deletedBy: string;
  deletedAt: number;
}

export interface ListConversationRequest {
  userId: string;
}

export interface ListConversationResponse {
  data: Conversation[];
}

export interface ListMessageRequest {
  conversationId: string;
  pagination: PaginationInput | undefined;
}

export interface ListMessageResponse {
  data: message[];
}

export const MESSAGE_PACKAGE_NAME = 'message';

export interface MessageServiceClient {
  sendMessage(
    request: SendMessageRequest,
    metadata?: Metadata,
  ): Observable<SendMessageResponse>;

  listMessage(
    request: ListMessageRequest,
    metadata?: Metadata,
  ): Observable<ListMessageResponse>;

  createConversation(
    request: CreateConversationRequest,
    metadata?: Metadata,
  ): Observable<CreateConversationResponse>;

  deleteConversation(
    request: DeleteConversationRequest,
    metadata?: Metadata,
  ): Observable<DeleteConversationResponse>;

  sendJoinGroup(
    request: SendJoinGroupRequest,
    metadata?: Metadata,
  ): Observable<SendJoinGroupResponse>;

  approveJoinGroup(
    request: ApproveJoinGroupRequest,
    metadata?: Metadata,
  ): Observable<ApproveJoinGroupResponse>;

  rejectJoinGroup(
    request: RejectJoinGroupRequest,
    metadata?: Metadata,
  ): Observable<RejectJoinGroupResponse>;

  leaveGroup(
    request: LeaveGroupRequest,
    metadata?: Metadata,
  ): Observable<LeaveGroupResponse>;

  /** rpc DeleteMessage(DeleteMessageRequest) returns (DeleteMessageResponse) {} */

  listConversation(
    request: ListConversationRequest,
    metadata?: Metadata,
  ): Observable<ListConversationResponse>;
}

export interface MessageServiceController {
  sendMessage(
    request: SendMessageRequest,
    metadata?: Metadata,
  ):
    | Promise<SendMessageResponse>
    | Observable<SendMessageResponse>
    | SendMessageResponse;

  listMessage(
    request: ListMessageRequest,
    metadata?: Metadata,
  ):
    | Promise<ListMessageResponse>
    | Observable<ListMessageResponse>
    | ListMessageResponse;

  createConversation(
    request: CreateConversationRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateConversationResponse>
    | Observable<CreateConversationResponse>
    | CreateConversationResponse;

  deleteConversation(
    request: DeleteConversationRequest,
    metadata?: Metadata,
  ):
    | Promise<DeleteConversationResponse>
    | Observable<DeleteConversationResponse>
    | DeleteConversationResponse;

  sendJoinGroup(
    request: SendJoinGroupRequest,
    metadata?: Metadata,
  ):
    | Promise<SendJoinGroupResponse>
    | Observable<SendJoinGroupResponse>
    | SendJoinGroupResponse;

  approveJoinGroup(
    request: ApproveJoinGroupRequest,
    metadata?: Metadata,
  ):
    | Promise<ApproveJoinGroupResponse>
    | Observable<ApproveJoinGroupResponse>
    | ApproveJoinGroupResponse;

  rejectJoinGroup(
    request: RejectJoinGroupRequest,
    metadata?: Metadata,
  ):
    | Promise<RejectJoinGroupResponse>
    | Observable<RejectJoinGroupResponse>
    | RejectJoinGroupResponse;

  leaveGroup(
    request: LeaveGroupRequest,
    metadata?: Metadata,
  ):
    | Promise<LeaveGroupResponse>
    | Observable<LeaveGroupResponse>
    | LeaveGroupResponse;

  /** rpc DeleteMessage(DeleteMessageRequest) returns (DeleteMessageResponse) {} */

  listConversation(
    request: ListConversationRequest,
    metadata?: Metadata,
  ):
    | Promise<ListConversationResponse>
    | Observable<ListConversationResponse>
    | ListConversationResponse;
}

export function MessageServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'sendMessage',
      'listMessage',
      'createConversation',
      'deleteConversation',
      'sendJoinGroup',
      'approveJoinGroup',
      'rejectJoinGroup',
      'leaveGroup',
      'listConversation',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MessageService', method)(
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
      GrpcStreamMethod('MessageService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MESSAGE_SERVICE_NAME = 'MessageService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
