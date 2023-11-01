import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SMS_PACKAGE_NAME } from '../proto/sms.pb';

export const smsClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: SMS_PACKAGE_NAME,
    protoPath: join(`${process.cwd()}/proto/sms.proto`),
    url: 'localhost:60062',
    loader: {
      keepCase: true,
      longs: String,
      enums: String,
      oneofs: true,
    },
  },
};
