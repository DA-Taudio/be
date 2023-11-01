import {
  AdminEntity,
  AppMetadata,
  AppleService,
  FacebookService,
  GoogleService,
  UserEntity,
} from '@app/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersCommandHandlers } from './cqrs/command';
import { UsersController } from './users.controller';
import { AdminRepository, UserRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersQueryHandlers } from './cqrs/query';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AdminEntity,
      AdminRepository,
      UserEntity,
      UserRepository,
    ]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...UsersCommandHandlers,
    ...UsersQueryHandlers,
    AppMetadata,
    FacebookService,
    GoogleService,
    AppleService,
  ],
})
export class UsersModule {}
