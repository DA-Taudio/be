import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { VoucherRepository } from '../../voucher.repository';
import { VoucherResponse } from '@app/proto-schema/proto/product.pb';
import { GetVoucherQuery } from '../impl';

@QueryHandler(GetVoucherQuery)
export class GetVoucherHandler implements IQueryHandler<GetVoucherQuery> {
  constructor(private readonly _voucherRepository: VoucherRepository) {}

  async execute({ query }: GetVoucherQuery): Promise<VoucherResponse> {
    const voucher = await this._voucherRepository.findById(query._id);
    if (!voucher) {
      throw new RpcException('Voucher không tồn tại !');
    }

    return voucher as unknown as VoucherResponse;
  }
}
