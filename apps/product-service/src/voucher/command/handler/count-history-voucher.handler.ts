import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TypeEntity, VoucherEntity } from '@app/core';
import {
  CountHistoryVoucherResponse,
  HistoryVoucherResponse,
} from '@app/proto-schema/proto/product.pb';
import { RpcException } from '@nestjs/microservices';
import { CountHistoryVoucherCommand } from '../impl';
import { HistoryVoucherRepository } from '../../voucher.repository';

@CommandHandler(CountHistoryVoucherCommand)
export class CountHistoryVoucherHandler
  implements ICommandHandler<CountHistoryVoucherCommand>
{
  constructor(
    private readonly _historyVoucherRepository: HistoryVoucherRepository,
  ) {}
  async execute({
    cmd,
  }: CountHistoryVoucherCommand): Promise<CountHistoryVoucherResponse> {
    const data = await this._historyVoucherRepository.find({
      voucherId: cmd.voucherId,
      deletedAt: null,
    });
    return { total: data.length } as CountHistoryVoucherResponse;
  }
}
