import { bloodTearsMiddleware } from '@app/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { UserInputError } from 'apollo-server-express';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { useContainer } from 'class-validator';
import { setupBullBoard } from '@app/utils/bull_board';

dotenv.config();

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableCors({
    origin: true,
    // preflightContinue: true,
    credentials: true,
    optionsSuccessStatus: 200,
  });
  app.use(bloodTearsMiddleware);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        if (errors.length > 0) {
          throw new UserInputError(`Form Arguments invalid`, {
            invalidArgs: errors.map((err) => {
              if (err.children.length) {
                return err.children.map((e) => ({
                  invalidArg: e.property,
                  constraints: e.constraints,
                }));
              }
              return {
                invalidArg: err.property,
                constraints: err.constraints,
              };
            }),
          });
        }
      },
    }),
  );

  const configService = app.get(ConfigService);
  const port: string = configService.get<string>('GATEWAY_PORT') || '5001';
  // setupBullBoard(app);
  await app.listen(port, () => {
    logger.log(`Server on http://localhost:${port}/graphql`);
  });
}

bootstrap();
