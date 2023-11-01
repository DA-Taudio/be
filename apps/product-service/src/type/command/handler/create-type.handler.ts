import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTypeCommand } from '../iml';
import { TypeRepository } from '../../type.repository';
import { TypeEntity } from '@app/core';
import { CreateProductResponse } from '@app/proto-schema/proto/product.pb';
import { RpcException } from '@nestjs/microservices';

@CommandHandler(CreateTypeCommand)
export class CreateTypeHandler implements ICommandHandler<CreateTypeCommand> {
  constructor(private readonly _typeRepository: TypeRepository) {}
  async execute({ cmd }: CreateTypeCommand): Promise<CreateProductResponse> {
    const type = await this._typeRepository.findOne({
      where: {
        name: cmd.name,
        $or: [
          { deletedAt: null },
          {
            deletedAt: { $gt: new Date() },
          },
        ],
      },
    });
    if (type) {
      throw new RpcException('Loại sản phẩm đã tồn tại!');
    }
    await this._typeRepository.save(new TypeEntity({ ...cmd }));
    return { success: true } as CreateProductResponse;
  }
}
