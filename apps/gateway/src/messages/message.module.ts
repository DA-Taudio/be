import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import {
  MessageLoaderResolver,
  MessageResolver,
  UserLoaderResolver,
} from './message.resolver';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageProcessor } from './message.processor';
import { Server } from 'socket.io';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: Number(configService.get('REDIS_PORT')),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({ name: 'message' }),
  ],
  providers: [
    MessageResolver,
    MessageService,
    MessageGateway,
    MessageProcessor,
    Server,
    UserLoaderResolver,
    MessageLoaderResolver,
  ],
})
export class MessageModule {}
