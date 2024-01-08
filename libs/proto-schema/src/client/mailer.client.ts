import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { MAILER_PACKAGE_NAME } from '../proto/mailer.pb';

export const mailerClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: MAILER_PACKAGE_NAME,
    protoPath: join(`${process.cwd()}/proto/mailer.proto`),
    url: 'localhost:20063',
    loader: {
      keepCase: true,
      longs: String,
      enums: String,
      oneofs: true,
    },
  },
};
