import { GetUserByPhoneNumberRequest } from '@app/proto-schema/proto/user.pb';
import { IQuery } from '@nestjs/cqrs';

export class UserByPhoneQuery implements IQuery {
  constructor(public readonly query: GetUserByPhoneNumberRequest) {}
}
