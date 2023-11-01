import { ServiceRegistryModule, TypeOrmConfigService } from '@app/core';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './notification/notification.module';

@Global()
@Module({
  imports: [
    //Setup
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    NotificationModule,
  ],
})
export class AppModule {}
