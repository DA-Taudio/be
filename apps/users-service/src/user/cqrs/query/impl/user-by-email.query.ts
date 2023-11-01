import { GetUserByEmailRequest } from '@app/proto-schema/proto/user.pb';
import { IQuery } from '@nestjs/cqrs';

export class GetUserByEmailQuery implements IQuery {
  constructor(public readonly query: GetUserByEmailRequest) {}
}
