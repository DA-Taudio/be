import { mediaClientOptions } from '@app/proto-schema/client';
import { setupSwagger } from '@app/utils/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module';
const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(MediaModule);

  app.connectMicroservice(mediaClientOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      dismissDefaultMessages: true,
      validationError: { target: false },
    }),
  );

  setupSwagger(app);

  app.enableCors();

  await app.startAllMicroservices();
  app.init();

  const port = 7007;
  await app.listen(port, () => {
    logger.log(`Server on http://localhost:${port}/`);
  });
}
bootstrap();
