import { AdminEntity } from '@app/core';
import { hashPassword } from '@app/utils';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { AdminRepository } from '../../../users.repository';
import { CreateAdminCommand } from '../impl';
import { CreateAdminResponse } from '@app/proto-schema/proto/user.pb';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute(command: CreateAdminCommand): Promise<CreateAdminResponse> {
    const { cmd } = command;
    const adminExist = await this.adminRepository.findOne({
      where: {
        userName: cmd.userName,
      },
    });
    if (adminExist) {
      throw new RpcException('Tên người dùng đã tồn tại');
    }

    await this.adminRepository.save(
      new AdminEntity({
        ...cmd,
        password: await hashPassword(cmd.password),
      } as unknown as AdminEntity),
    );

    return {
      success: true,
    };
  }
}
