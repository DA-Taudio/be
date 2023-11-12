import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { HistoryVoucherRepository } from '../../voucher.repository';
import { DeleteHistoryVoucherCommand } from '../impl';
import { BooleanPayload } from '@app/proto-schema/proto/base.pb';

@CommandHandler(DeleteHistoryVoucherCommand)
export class DeleteHistoryVoucherHandler
  implements ICommandHandler<DeleteHistoryVoucherCommand>
{
  constructor(
    private readonly _historyVoucherRepository: HistoryVoucherRepository,
  ) {}
  async execute({ cmd }: DeleteHistoryVoucherCommand): Promise<BooleanPayload> {
    const history = await this._historyVoucherRepository.findById(
      cmd.historyVoucherId,
    );
    if (!history) {
      throw new RpcException('Voucher không tồn tại !');
    }
    await this._historyVoucherRepository.softDeleteById(cmd.historyVoucherId);
    return { success: true } as BooleanPayload;
  }
}
