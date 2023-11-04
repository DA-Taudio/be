import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TypeEntity, VoucherEntity } from '@app/core';
import { VoucherResponse } from '@app/proto-schema/proto/product.pb';
import { RpcException } from '@nestjs/microservices';
import { VoucherRepository } from '../../voucher.repository';
import { UpdateVoucherCommand } from '../impl';
import { BooleanPayload } from '@app/proto-schema/proto/base.pb';

@CommandHandler(UpdateVoucherCommand)
export class UpdateVoucherHandler
  implements ICommandHandler<UpdateVoucherCommand>
{
  constructor(private readonly _voucherRepository: VoucherRepository) {}
  async execute({ cmd }: UpdateVoucherCommand): Promise<BooleanPayload> {
    const { _id, ...updateInput } = cmd;
    const voucher = await this._voucherRepository.findById(cmd._id);
    if (!voucher) throw new RpcException('Sản phẩm không tồn tại !');

    const { value } = await this._voucherRepository.findOneAndUpdate(
      { _id: cmd._id },
      { $set: { ...updateInput } },
      { returnOriginal: false },
    );
    return { success: true } as unknown as BooleanPayload;
  }
}
