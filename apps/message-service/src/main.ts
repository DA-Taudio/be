import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { messageClientOptions } from '@app/proto-schema';
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    messageClientOptions,
  );
  app.listen().then(() => {
    logger.log('Microservice messages is listening in port20066');
  });
}
bootstrap();
