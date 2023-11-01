import { ServiceRegistryModule, TypeOrmConfigService } from '@app/core';
import { AppMetadata } from '@app/core/common';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageModule } from './message/message.module';

@Global()
@Module({
  imports: [
    //Setup
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    MessageModule,
  ],
})
export class AppModule {}
