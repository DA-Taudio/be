import { ServiceRegistryModule, TypeOrmConfigService } from '@app/core';
import { AppMetadata } from '@app/core/common';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './user/users.module';
import { UsersController } from './user/users.controller';

@Global()
@Module({
  imports: [
    //Setup
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    UsersModule,
  ],
  providers: [AppMetadata],
})
export class AppModule {}
