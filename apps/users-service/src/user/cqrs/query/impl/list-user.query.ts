import { ListUserRequest } from '@app/proto-schema/proto/user.pb';
import { IQuery } from '@nestjs/cqrs';

export class ListUserQuery implements IQuery {
  constructor(public readonly query: ListUserRequest) {}
}
