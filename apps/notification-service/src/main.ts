import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { notificationClientOptions } from '@app/proto-schema';
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    notificationClientOptions,
  );
  app.listen().then(() => {
    logger.log('Microservice messages is listening in port 60067');
  });
}
bootstrap();
