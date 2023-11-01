import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { DeleteTypeCommand } from '../iml';
import { TypeRepository } from '../../type.repository';
import { DeleteTypeResponse } from '@app/proto-schema/proto/product.pb';

@CommandHandler(DeleteTypeCommand)
export class DeleteTypeHandler implements ICommandHandler<DeleteTypeCommand> {
  constructor(private readonly _typeRepository: TypeRepository) {}

  async execute(command: DeleteTypeCommand): Promise<DeleteTypeResponse> {
    const { cmd } = command;

    const TypeExist = await this._typeRepository.findById(cmd.typeId);
    if (!TypeExist) {
      throw new RpcException('Loại không tồn tại !');
    }
    await this._typeRepository.softDeleteById(cmd.typeId);

    return {
      success: true,
    } as unknown as DeleteTypeResponse;
  }
}
