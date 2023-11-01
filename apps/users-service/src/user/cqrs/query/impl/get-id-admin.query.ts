import { GetIdAdminRequest } from '@app/proto-schema/proto/user.pb';
import { IQuery } from '@nestjs/cqrs';

export class GetIdAdminQuery implements IQuery {
  constructor(public readonly cmd: GetIdAdminRequest) {}
}
