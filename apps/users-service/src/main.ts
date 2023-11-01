import { usersClientOptions } from '@app/proto-schema';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    usersClientOptions,
  );
  app.listen().then(() => {
    logger.log('Microservice users is listening in port 60061');
  });
}
bootstrap();
