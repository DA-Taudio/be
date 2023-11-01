import { AppMetadata, FindNoSQL, TypeEntity } from '@app/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeRepository } from './type.repository';
import { TypeController } from './type.controller';
import { TypeCommandHandlers } from './command';
import { TypeQueryHandlers } from './query';

@Module({
  imports: [TypeOrmModule.forFeature([TypeEntity, TypeRepository])],
  controllers: [TypeController],
  providers: [
    FindNoSQL,
    ...TypeCommandHandlers,
    ...TypeQueryHandlers,
    AppMetadata,
  ],
})
export class TypeModule {}
