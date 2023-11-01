import { AppMetadata } from '@app/core';
import {
  CreateAdminRequest,
  GetUserByPhoneNumberRequest,
  RegisterUserRequest,
  USERS_SERVICE_NAME,
  VerifyPhoneRequest,
  ReadUserRequest,
  LoginOrCreateAccountRequest,
  GetListUserByIdsRequest,
  ChangePasswordRequest,
  GetUserByEmailRequest,
  UpdateProfileRequest,
  UpdateAvatarUserRequest,
  ChangePasswordWhenLoginRequest,
  GetAdminByUserNameRequest,
  GetIdAdminRequest,
  ListUserRequest,
  LockOrUnLockUserRequest,
} from '@app/proto-schema/proto/user.pb';
import { Controller } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import {
  ChangePasswordCommand,
  ChangePasswordWhenLoginCommand,
  CreateAdminCommand,
  LockOrUnLockUserCommand,
  LoginOrCreateCommand,
  RegisterUserCommand,
  UpdateAvatarUserCommand,
  UpdateProfileCommand,
  VerifyPhoneCommand,
} from './cqrs/command';
import {
  GetAdminByUserNameQuery,
  GetIdAdminQuery,
  GetListUserByIdsQuery,
  GetUserByEmailQuery,
  ListUserQuery,
  ReadUserQuery,
  UserByPhoneQuery,
} from './cqrs/query';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly appMetadata: AppMetadata,
  ) {}

  @GrpcMethod(USERS_SERVICE_NAME, 'CreateAdmin')
  async createAdmin(input: CreateAdminRequest) {
    return await this.commandBus.execute(new CreateAdminCommand(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'RegisterUser')
  async registerUser(input: RegisterUserRequest) {
    return await this.commandBus.execute(new RegisterUserCommand(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'GetUserByPhoneNumber')
  async getUserByPhoneNumber(input: GetUserByPhoneNumberRequest) {
    return await this.queryBus.execute(new UserByPhoneQuery(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'VerifyPhone')
  async verifyPhone(input: VerifyPhoneRequest) {
    return await this.commandBus.execute(new VerifyPhoneCommand(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'ReadUser')
  async readUser(input: ReadUserRequest) {
    return await this.queryBus.execute(new ReadUserQuery(input));
  }
  @GrpcMethod(USERS_SERVICE_NAME, 'LoginOrCreateAccount')
  async loginOrCreateAccount(input: LoginOrCreateAccountRequest) {
    return await this.commandBus.execute(new LoginOrCreateCommand(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'GetListUserByIds')
  async getListUserByIds(input: GetListUserByIdsRequest) {
    return await this.queryBus.execute(new GetListUserByIdsQuery(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'changePassword')
  async changePassword(input: ChangePasswordRequest) {
    return await this.commandBus.execute(new ChangePasswordCommand(input));
  }
  @GrpcMethod(USERS_SERVICE_NAME, 'getUserByEmail')
  async getUserByEmail(query: GetUserByEmailRequest) {
    return await this.queryBus.execute(new GetUserByEmailQuery(query));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'updateProfile')
  async updateProfile(input: UpdateProfileRequest) {
    return await this.commandBus.execute(new UpdateProfileCommand(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'updateAvatarUser')
  async updateAvatar(input: UpdateAvatarUserRequest, metadata: Metadata) {
    return await this.commandBus.execute(
      new UpdateAvatarUserCommand(input, this.appMetadata.getUserId(metadata)),
    );
  }
  @GrpcMethod(USERS_SERVICE_NAME, 'changePasswordWhenLogin')
  async changePasswordWhenLogin(
    input: ChangePasswordWhenLoginRequest,
    metadata: Metadata,
  ) {
    return await this.commandBus.execute(
      new ChangePasswordWhenLoginCommand(
        input,
        this.appMetadata.getUserId(metadata),
      ),
    );
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'getAdminByUserName')
  async getAdminByUserName(input: GetAdminByUserNameRequest) {
    return await this.queryBus.execute(new GetAdminByUserNameQuery(input));
  }

  @GrpcMethod(USERS_SERVICE_NAME, 'getIdAdmin')
  async getIdAdmin(input: GetIdAdminRequest) {
    return await this.queryBus.execute(new GetIdAdminQuery(input));
  }
  @GrpcMethod(USERS_SERVICE_NAME, 'ListUser')
  async listUser(input: ListUserRequest) {
    return await this.queryBus.execute(new ListUserQuery(input));
  }
  @GrpcMethod(USERS_SERVICE_NAME, 'LockOrUnLockUser')
  async lockOrUnLockUser(input: LockOrUnLockUserRequest) {
    return await this.commandBus.execute(new LockOrUnLockUserCommand(input));
  }
}
