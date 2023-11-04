import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { VoucherRepository } from '../../voucher.repository';
import { DeleteVoucherCommand } from '../impl';
import { BooleanPayload } from '@app/proto-schema/proto/base.pb';

@CommandHandler(DeleteVoucherCommand)
export class DeleteVoucherHandler
  implements ICommandHandler<DeleteVoucherCommand>
{
  constructor(private readonly _voucherRepository: VoucherRepository) {}
  async execute({ cmd }: DeleteVoucherCommand): Promise<BooleanPayload> {
    const voucher = await this._voucherRepository.findById(cmd._id);
    if (!voucher) {
      throw new RpcException('Voucher không tồn tại !');
    }
    await this._voucherRepository.softDeleteById(cmd._id);
    return { success: true } as BooleanPayload;
  }
}
