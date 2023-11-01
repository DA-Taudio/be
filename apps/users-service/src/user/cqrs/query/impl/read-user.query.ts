import { ReadUserRequest } from '@app/proto-schema/proto/user.pb';
import { IQuery } from '@nestjs/cqrs';

export class ReadUserQuery implements IQuery {
  constructor(public readonly query: ReadUserRequest) {}
}
