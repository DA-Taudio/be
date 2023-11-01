import { AppMetadata, ServiceRegistryModule } from '@app/core';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BullModule } from '@nestjs/bull';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { USERS_SERVICE_NAME } from '@app/proto-schema/proto/user.pb';
import {
  mailerClientOptions,
  mediaClientOptions,
  messageClientOptions,
  productClientOptions,
  smsClientOptions,
  usersClientOptions,
} from '@app/proto-schema';
import { GqlConfigService } from './gql-config.service';
import { AuthModule } from './auth/auth.module';
import { SMS_SERVICE_NAME } from '@app/proto-schema/proto/sms.pb';
import { SmsModule } from './sms/sms.module';
import { MailerModule } from './mailer/mailer.module';
import { MAILER_SERVICE_NAME } from '@app/proto-schema/proto/mailer.pb';
import { MessageModule } from './messages/message.module';
import { PRODUCT_SERVICE_NAME } from '@app/proto-schema/proto/product.pb';
import { ProductModule } from './product/product.module';
import { MESSAGE_SERVICE_NAME } from '@app/proto-schema/proto/message.pb';
import { UserModule } from './user/user.module';
import { DataloaderModule } from './dataloaders/dataloader.module';
import { DataloaderService } from './dataloaders/dataloader.service';
import { MEDIA_SERVICE_NAME } from '@app/proto-schema/proto/media.pb';
import { AppController } from './app.controller';

@Global()
@Module({
  imports: [
    ServiceRegistryModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [DataloaderModule],
      inject: [DataloaderService],
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    // BullModule.registerQueue({ name: 'sms' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          // secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: SMS_SERVICE_NAME,
        ...smsClientOptions,
      },
      {
        name: USERS_SERVICE_NAME,
        ...usersClientOptions,
      },
      {
        name: MAILER_SERVICE_NAME,
        ...mailerClientOptions,
      },
      {
        name: PRODUCT_SERVICE_NAME,
        ...productClientOptions,
      },
      {
        name: MESSAGE_SERVICE_NAME,
        ...messageClientOptions,
      },
      {
        name: MEDIA_SERVICE_NAME,
        ...mediaClientOptions,
      },
    ]),
    AuthModule,
    SmsModule,
    MailerModule,
    MessageModule,
    ProductModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppMetadata],
  exports: [JwtModule, ClientsModule, AppMetadata],
})
export class AppModule {}
