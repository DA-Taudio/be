import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import {
  MediaEntity,
  ServiceRegistryModule,
  TypeOrmConfigService,
} from '@app/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaRepository } from './media.repository';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ClientsModule } from '@nestjs/microservices';
import { JwtStrategy } from 'apps/gateway/src/auth/strategy/jwt.strategy';
import { USERS_SERVICE_NAME } from '@app/proto-schema/proto/user.pb';
import { usersClientOptions } from '@app/proto-schema';

@Module({
  imports: [
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    TypeOrmModule.forFeature([MediaEntity, MediaRepository]),
    ServeStaticModule.forRootAsync({
      useFactory: (configService: ConfigService) => [
        {
          rootPath: join(
            __dirname,
            '../../../',
            configService.get<string>('FILE_STORAGE_PATH'),
          ),
          serveRoot: `/${configService.get<string>('FILE_STORAGE_PATH')}`,
          exclude: ['/api*'],
        },
        {
          rootPath: join(
            __dirname,
            '../../../',
            configService.get<string>('FILE_PDF_PATH'),
          ),
          serveRoot: `/${configService.get<string>('FILE_PDF_PATH')}`,
          exclude: ['/api*'],
        },
      ],
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: USERS_SERVICE_NAME,
        ...usersClientOptions,
      },
    ]),
  ],
  controllers: [MediaController],
  providers: [MediaService, JwtStrategy],
})
export class MediaModule {}
