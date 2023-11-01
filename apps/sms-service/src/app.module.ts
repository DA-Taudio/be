import {
  AppMetadata,
  ServiceRegistryModule,
  TypeOrmConfigService,
} from '@app/core';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmsModule } from './sms/sms.module';

@Module({
  imports: [
    //Setup
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    SmsModule,
  ],
  providers: [AppMetadata],
})
export class AppModule {}
