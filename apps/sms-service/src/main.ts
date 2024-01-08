import { smsClientOptions } from '@app/proto-schema/client';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    smsClientOptions,
  );
  app.listen().then(() => {
    logger.log('Microservice sms is listening port20062 ....');
  });
}
bootstrap();
