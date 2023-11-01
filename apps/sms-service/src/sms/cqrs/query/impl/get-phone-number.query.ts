import { GetPhoneNumberRequest } from '@app/proto-schema/proto/sms.pb';
import { IQuery } from '@nestjs/cqrs';

export class GetPhoneNumberQuery implements IQuery {
  constructor(public readonly query: GetPhoneNumberRequest) {}
}
