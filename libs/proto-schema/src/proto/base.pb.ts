/* eslint-disable */
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'base';

export enum SortDirection {
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface PageInfo {
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

export interface PaginationResponse {
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface BooleanPayload {
  success: boolean;
}

export interface SortFieldInput {
  sortField: string;
  sortDirection: SortDirection;
}

export const BASE_PACKAGE_NAME = 'base';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
