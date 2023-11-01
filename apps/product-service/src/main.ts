import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { productClientOptions } from '@app/proto-schema';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice(productClientOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: { target: false },
    }),
  );
  await app.startAllMicroservices();
  app.init();

  const port = 7006;
  await app.listen(port, () => {
    logger.log('Microservice products is listening in port 60065');
  });
}
bootstrap();
