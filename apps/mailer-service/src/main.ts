import { mailerClientOptions } from '@app/proto-schema/client/mailer.client';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    mailerClientOptions,
  );
  app.listen().then(() => {
    logger.log('Microservice mailer is listening 60063...');
  });
}
bootstrap();
