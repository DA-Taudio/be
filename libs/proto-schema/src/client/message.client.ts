import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MESSAGE_PACKAGE_NAME } from '../proto/message.pb';

export const messageClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: MESSAGE_PACKAGE_NAME,
    protoPath: join(`${process.cwd()}/proto/message.proto`),
    url: 'localhost:20066',
    loader: {
      keepCase: true,
      longs: String,
      enums: String,
      oneofs: true,
    },
  },
};
