/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { PaginationInput, PaginationResponse, BooleanPayload } from './base.pb';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'media';

export enum MediaStatus {
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
}

export enum SliderType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
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

export interface SliderResponse {
  _id: string;
  mediaId: string;
  position: number;
  type: SliderType;
  redirectUrl: string;
}

export interface FilterList {
  type_eq: SliderType;
}

export interface ListSliderRequest {
  filter: FilterList | undefined;
  pagination: PaginationInput | undefined;
}

export interface GetSliderRequest {
  sliderId: string;
}

export interface CreateSliderRequest {
  mediaId: string;
  position: number;
  type: SliderType;
  redirectUrl: string;
}

export interface UpdateSliderRequest {
  mediaId: string;
  position: number;
  type: SliderType;
  redirectUrl: string;
  sliderId: string;
}

export interface DeleteSliderRequest {
  sliderId: string;
}

export interface ListSliderResponse {
  sliders: SliderResponse[];
  pagination: PaginationResponse | undefined;
  totalItem: number;
}

export const MEDIA_PACKAGE_NAME = 'media';

export interface MediaServiceClient {
  getManyMedia(
    request: GetManyMediaRequest,
    metadata?: Metadata,
  ): Observable<GetManyMediaResponse>;

  listSlider(
    request: ListSliderRequest,
    metadata?: Metadata,
  ): Observable<ListSliderResponse>;

  getSlider(
    request: GetSliderRequest,
    metadata?: Metadata,
  ): Observable<SliderResponse>;

  createSlider(
    request: CreateSliderRequest,
    metadata?: Metadata,
  ): Observable<SliderResponse>;

  updateSlider(
    request: UpdateSliderRequest,
    metadata?: Metadata,
  ): Observable<BooleanPayload>;

  deleteSlider(
    request: DeleteSliderRequest,
    metadata?: Metadata,
  ): Observable<BooleanPayload>;
}

export interface MediaServiceController {
  getManyMedia(
    request: GetManyMediaRequest,
    metadata?: Metadata,
  ):
    | Promise<GetManyMediaResponse>
    | Observable<GetManyMediaResponse>
    | GetManyMediaResponse;

  listSlider(
    request: ListSliderRequest,
    metadata?: Metadata,
  ):
    | Promise<ListSliderResponse>
    | Observable<ListSliderResponse>
    | ListSliderResponse;

  getSlider(
    request: GetSliderRequest,
    metadata?: Metadata,
  ): Promise<SliderResponse> | Observable<SliderResponse> | SliderResponse;

  createSlider(
    request: CreateSliderRequest,
    metadata?: Metadata,
  ): Promise<SliderResponse> | Observable<SliderResponse> | SliderResponse;

  updateSlider(
    request: UpdateSliderRequest,
    metadata?: Metadata,
  ): Promise<BooleanPayload> | Observable<BooleanPayload> | BooleanPayload;

  deleteSlider(
    request: DeleteSliderRequest,
    metadata?: Metadata,
  ): Promise<BooleanPayload> | Observable<BooleanPayload> | BooleanPayload;
}

export function MediaServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'getManyMedia',
      'listSlider',
      'getSlider',
      'createSlider',
      'updateSlider',
      'deleteSlider',
    ];
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
