/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'media';

export enum MediaStatus {
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
}

export interface Media {
  userId: string;
  name: string;
  fileName: string;
  mimeType: string;
  size: number;
  duration: number;
  url: string;
  status: MediaStatus;
  _id: string;
}

export interface GetManyMediaRequest {
  ids: string[];
}

export interface GetManyMediaResponse {
  media: Media[];
}

export const MEDIA_PACKAGE_NAME = 'media';

export interface MediaServiceClient {
  getManyMedia(
    request: GetManyMediaRequest,
    metadata?: Metadata,
  ): Observable<GetManyMediaResponse>;
}

export interface MediaServiceController {
  getManyMedia(
    request: GetManyMediaRequest,
    metadata?: Metadata,
  ):
    | Promise<GetManyMediaResponse>
    | Observable<GetManyMediaResponse>
    | GetManyMediaResponse;
}

export function MediaServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ['getManyMedia'];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('MediaService', method)(
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
      GrpcStreamMethod('MediaService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const MEDIA_SERVICE_NAME = 'MediaService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
