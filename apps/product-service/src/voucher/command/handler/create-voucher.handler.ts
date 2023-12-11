import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TypeEntity, VoucherEntity } from '@app/core';
import { VoucherResponse } from '@app/proto-schema/proto/product.pb';
import { RpcException } from '@nestjs/microservices';
import { VoucherRepository } from '../../voucher.repository';
import { CreateVoucherCommand } from '../impl';

@CommandHandler(CreateVoucherCommand)
export class CreateVoucherHandler
  implements ICommandHandler<CreateVoucherCommand>
{
  constructor(private readonly _voucherRepository: VoucherRepository) {}
  async execute({ cmd }: CreateVoucherCommand): Promise<VoucherResponse> {
    const voucherExist = await this._voucherRepository.findOne({
      where: {
        code: cmd.code,
        $or: [
          { deletedAt: null },
          {
            deletedAt: { $gt: new Date() },
          },
        ],
      },
    });
    if (voucherExist) {
      throw new RpcException('Mã voucher đã tồn tại!');
    }
    const voucher = await this._voucherRepository.save({
      ...cmd,
      startTime: new Date(cmd.startTime),
      endTime: new Date(cmd.endTime),
    });
    return voucher as unknown as VoucherResponse;
  }
}
