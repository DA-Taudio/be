/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export const protobufPackage = 'users';

/** ENUM */
export enum Provider {
  Facebook = 'Facebook',
  Google = 'Google',
  Apple = 'Apple',
}

export enum Gender {
  UNKNOWN = 'UNKNOWN',
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

/** User */
export interface RegisterUserRequest {
  fullName: string;
  phoneNumber: string;
  password: string;
}

export interface RegisterUserResponse {
  _id: string;
  fullName: string;
  phoneNumber: string;
}

export interface GetUserByPhoneNumberRequest {
  phoneNumber: string;
}

export interface ReadUserResponse {
  user: User | undefined;
}

export interface VerifyPhoneRequest {
  phoneNumber: string;
}

export interface VerifyPhoneResponse {
  verified: boolean;
}

export interface ReadUserRequest {
  _id: string;
}

export interface LoginOrCreateAccountRequest {
  provider: Provider;
  accessToken: string;
}

export interface LoginOrCreateAccountResponse {
  user: User | undefined;
}

/** Admin */
export interface CreateAdminRequest {
  fullName: string;
  password: string;
  userName: string;
}

export interface CreateAdminResponse {
  success: boolean;
}

/** ENTITY */
export interface User {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  provider: Provider;
  providerId: string;
  verifyEmail: boolean;
  verifyPhone: boolean;
  verified: boolean;
  twoFactorAuthenticationSecret: boolean;
  gender: Gender;
  birthday: number;
  address: string;
  avatarId: string;
  _id: string;
  active: boolean;
  /** base */
  createdAt: number;
  createdBy: string;
  updatedAt: number;
  updatedBy: string;
  deletedBy: string;
  deletedAt: number;
}

export interface GetListUserByIdsRequest {
  ids: string[];
}

export interface GetListUserByIdsResponse {
  user: User[];
}

export interface ChangePasswordRequest {
  phoneNumber: string;
  password: string;
}

export interface ChangePasswordResponse {
  updated: boolean;
}

export interface UpdateProfileRequest {
  userId: string;
  fullName: string;
  email: string;
  gender: Gender;
  birthday: string;
  address: string;
  bio: string;
  avatarId: string;
  country: string;
}

export interface UpdateProfileResponse {
  updated: boolean;
}

export interface UpdateAvatarUserRequest {
  avatarId: string;
}

export interface UpdateAvatarUserResponse {
  success: boolean;
}

export interface ChangePasswordWhenLoginRequest {
  currentPassword: string;
  newPassword: string;
}

export interface ChangePasswordWhenLoginResponse {
  changed: boolean;
}

export interface Admin {
  fullName: string;
  password: string;
  userName: string;
  /** base */
  createdAt: number;
  createdBy: number;
  updatedAt: number;
  updatedBy: number;
  deletedBy: string;
  deletedAt: number;
  _id: string;
}

export interface GetAdminByUserNameRequest {
  userName: string;
}

export interface GetAdminByUserNameResponse {
  admin: Admin | undefined;
}

export interface GetUserByEmailRequest {
  email: string;
}

export interface GetIdAdminResponse {
  id: string;
}

export interface GetIdAdminRequest {}

export interface ListUserRequest {}

export interface ListUserResponse {
  user: User[];
}

export interface LockOrUnLockUserRequest {
  id: string;
}

export interface LockOrUnLockUserResponse {
  success: boolean;
}

export const USERS_PACKAGE_NAME = 'users';

export interface UsersServiceClient {
  /** User */

  registerUser(
    request: RegisterUserRequest,
    metadata?: Metadata,
  ): Observable<RegisterUserResponse>;

  getUserByPhoneNumber(
    request: GetUserByPhoneNumberRequest,
    metadata?: Metadata,
  ): Observable<ReadUserResponse>;

  verifyPhone(
    request: VerifyPhoneRequest,
    metadata?: Metadata,
  ): Observable<VerifyPhoneResponse>;

  readUser(
    request: ReadUserRequest,
    metadata?: Metadata,
  ): Observable<ReadUserResponse>;

  loginOrCreateAccount(
    request: LoginOrCreateAccountRequest,
    metadata?: Metadata,
  ): Observable<LoginOrCreateAccountResponse>;

  getListUserByIds(
    request: GetListUserByIdsRequest,
    metadata?: Metadata,
  ): Observable<GetListUserByIdsResponse>;

  changePassword(
    request: ChangePasswordRequest,
    metadata?: Metadata,
  ): Observable<ChangePasswordResponse>;

  updateProfile(
    request: UpdateProfileRequest,
    metadata?: Metadata,
  ): Observable<UpdateProfileResponse>;

  updateAvatarUser(
    request: UpdateAvatarUserRequest,
    metadata?: Metadata,
  ): Observable<UpdateAvatarUserResponse>;

  changePasswordWhenLogin(
    request: ChangePasswordWhenLoginRequest,
    metadata?: Metadata,
  ): Observable<ChangePasswordWhenLoginResponse>;

  getUserByEmail(
    request: GetUserByEmailRequest,
    metadata?: Metadata,
  ): Observable<ReadUserResponse>;

  listUser(
    request: ListUserRequest,
    metadata?: Metadata,
  ): Observable<ListUserResponse>;

  lockOrUnLockUser(
    request: LockOrUnLockUserRequest,
    metadata?: Metadata,
  ): Observable<LockOrUnLockUserResponse>;

  /** Admin */

  createAdmin(
    request: CreateAdminRequest,
    metadata?: Metadata,
  ): Observable<CreateAdminResponse>;

  getAdminByUserName(
    request: GetAdminByUserNameRequest,
    metadata?: Metadata,
  ): Observable<GetAdminByUserNameResponse>;

  getIdAdmin(
    request: GetIdAdminRequest,
    metadata?: Metadata,
  ): Observable<GetIdAdminResponse>;
}

export interface UsersServiceController {
  /** User */

  registerUser(
    request: RegisterUserRequest,
    metadata?: Metadata,
  ):
    | Promise<RegisterUserResponse>
    | Observable<RegisterUserResponse>
    | RegisterUserResponse;

  getUserByPhoneNumber(
    request: GetUserByPhoneNumberRequest,
    metadata?: Metadata,
  ):
    | Promise<ReadUserResponse>
    | Observable<ReadUserResponse>
    | ReadUserResponse;

  verifyPhone(
    request: VerifyPhoneRequest,
    metadata?: Metadata,
  ):
    | Promise<VerifyPhoneResponse>
    | Observable<VerifyPhoneResponse>
    | VerifyPhoneResponse;

  readUser(
    request: ReadUserRequest,
    metadata?: Metadata,
  ):
    | Promise<ReadUserResponse>
    | Observable<ReadUserResponse>
    | ReadUserResponse;

  loginOrCreateAccount(
    request: LoginOrCreateAccountRequest,
    metadata?: Metadata,
  ):
    | Promise<LoginOrCreateAccountResponse>
    | Observable<LoginOrCreateAccountResponse>
    | LoginOrCreateAccountResponse;

  getListUserByIds(
    request: GetListUserByIdsRequest,
    metadata?: Metadata,
  ):
    | Promise<GetListUserByIdsResponse>
    | Observable<GetListUserByIdsResponse>
    | GetListUserByIdsResponse;

  changePassword(
    request: ChangePasswordRequest,
    metadata?: Metadata,
  ):
    | Promise<ChangePasswordResponse>
    | Observable<ChangePasswordResponse>
    | ChangePasswordResponse;

  updateProfile(
    request: UpdateProfileRequest,
    metadata?: Metadata,
  ):
    | Promise<UpdateProfileResponse>
    | Observable<UpdateProfileResponse>
    | UpdateProfileResponse;

  updateAvatarUser(
    request: UpdateAvatarUserRequest,
    metadata?: Metadata,
  ):
    | Promise<UpdateAvatarUserResponse>
    | Observable<UpdateAvatarUserResponse>
    | UpdateAvatarUserResponse;

  changePasswordWhenLogin(
    request: ChangePasswordWhenLoginRequest,
    metadata?: Metadata,
  ):
    | Promise<ChangePasswordWhenLoginResponse>
    | Observable<ChangePasswordWhenLoginResponse>
    | ChangePasswordWhenLoginResponse;

  getUserByEmail(
    request: GetUserByEmailRequest,
    metadata?: Metadata,
  ):
    | Promise<ReadUserResponse>
    | Observable<ReadUserResponse>
    | ReadUserResponse;

  listUser(
    request: ListUserRequest,
    metadata?: Metadata,
  ):
    | Promise<ListUserResponse>
    | Observable<ListUserResponse>
    | ListUserResponse;

  lockOrUnLockUser(
    request: LockOrUnLockUserRequest,
    metadata?: Metadata,
  ):
    | Promise<LockOrUnLockUserResponse>
    | Observable<LockOrUnLockUserResponse>
    | LockOrUnLockUserResponse;

  /** Admin */

  createAdmin(
    request: CreateAdminRequest,
    metadata?: Metadata,
  ):
    | Promise<CreateAdminResponse>
    | Observable<CreateAdminResponse>
    | CreateAdminResponse;

  getAdminByUserName(
    request: GetAdminByUserNameRequest,
    metadata?: Metadata,
  ):
    | Promise<GetAdminByUserNameResponse>
    | Observable<GetAdminByUserNameResponse>
    | GetAdminByUserNameResponse;

  getIdAdmin(
    request: GetIdAdminRequest,
    metadata?: Metadata,
  ):
    | Promise<GetIdAdminResponse>
    | Observable<GetIdAdminResponse>
    | GetIdAdminResponse;
}

export function UsersServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'registerUser',
      'getUserByPhoneNumber',
      'verifyPhone',
      'readUser',
      'loginOrCreateAccount',
      'getListUserByIds',
      'changePassword',
      'updateProfile',
      'updateAvatarUser',
      'changePasswordWhenLogin',
      'getUserByEmail',
      'listUser',
      'lockOrUnLockUser',
      'createAdmin',
      'getAdminByUserName',
      'getIdAdmin',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('UsersService', method)(
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
      GrpcStreamMethod('UsersService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const USERS_SERVICE_NAME = 'UsersService';

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
