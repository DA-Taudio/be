import { GetListUserByIdsRequest } from '@app/proto-schema/proto/user.pb';
import { IQuery } from '@nestjs/cqrs';

export class GetListUserByIdsQuery implements IQuery {
  constructor(public readonly query: GetListUserByIdsRequest) {}
}
