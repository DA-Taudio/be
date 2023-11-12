import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TypeEntity, VoucherEntity } from '@app/core';
import { HistoryVoucherResponse } from '@app/proto-schema/proto/product.pb';
import { RpcException } from '@nestjs/microservices';
import { CreateHistoryVoucherCommand } from '../impl';
import { HistoryVoucherRepository } from '../../voucher.repository';

@CommandHandler(CreateHistoryVoucherCommand)
export class CreateHistoryVoucherHandler
  implements ICommandHandler<CreateHistoryVoucherCommand>
{
  constructor(
    private readonly _historyVoucherRepository: HistoryVoucherRepository,
  ) {}
  async execute({
    cmd,
  }: CreateHistoryVoucherCommand): Promise<HistoryVoucherResponse> {
    const history = await this._historyVoucherRepository.save(cmd);
    return history as unknown as HistoryVoucherResponse;
  }
}
