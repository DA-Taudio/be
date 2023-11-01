import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MEDIA_PACKAGE_NAME } from '../proto/media.pb';

export const mediaClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: MEDIA_PACKAGE_NAME,
    protoPath: join(`${process.cwd()}/proto/media.proto`),
    url: 'localhost:60064',
    loader: {
      keepCase: true,
      longs: String,
      enums: String,
      oneofs: true,
    },
  },
};
