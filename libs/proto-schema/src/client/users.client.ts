import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { USERS_PACKAGE_NAME } from '../proto/user.pb';

export const usersClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: USERS_PACKAGE_NAME,
    protoPath: join(`${process.cwd()}/proto/user.proto`),
    url: 'localhost:20061',

    loader: {
      keepCase: true,
      longs: String,
      enums: String,
      oneofs: true,
    },
  },
};
