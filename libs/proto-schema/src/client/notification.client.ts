import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { NOTIFICATION_PACKAGE_NAME } from '../proto/notification.pb';

export const notificationClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: NOTIFICATION_PACKAGE_NAME,
    protoPath: join(`${process.cwd()}/proto/notification.proto`),
    url: 'localhost:20067',
    loader: {
      keepCase: true,
      longs: String,
      enums: String,
      oneofs: true,
    },
  },
};
