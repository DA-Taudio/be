import { OtpEntity } from '@app/core';
import { SmsProcessor } from './sms.processor';
import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OtpRepository } from './otp.repository';
import { SmsController } from './sms.controller';
import { SmsCommandHandlers } from './cqrs/command';
import { SmsQueryHandlers } from './cqrs/query';

@Module({
  imports: [
    TypeOrmModule.forFeature([OtpRepository, OtpEntity]),
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
    BullModule.registerQueue({ name: 'sms' }),
  ],
  controllers: [SmsController],
  providers: [...SmsCommandHandlers, ...SmsQueryHandlers, SmsProcessor],
})
export class SmsModule {}
