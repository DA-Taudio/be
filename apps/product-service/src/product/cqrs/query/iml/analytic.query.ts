import { AnalyticRequest } from '@app/proto-schema/proto/product.pb';
import { IQuery } from '@nestjs/cqrs';

export class AnalyticQuery implements IQuery {
  constructor(public readonly cmd: AnalyticRequest) {}
}
