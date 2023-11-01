import { GetAdminByUserNameResponse } from '@app/proto-schema/proto/user.pb';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { AdminRepository } from '../../../users.repository';
import { GetAdminByUserNameQuery } from '../impl';

@QueryHandler(GetAdminByUserNameQuery)
export class GetAdminByUserNameHandler
  implements IQueryHandler<GetAdminByUserNameQuery>
{
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute({
    cmd,
  }: GetAdminByUserNameQuery): Promise<GetAdminByUserNameResponse> {
    const { userName } = cmd;

    const admin = await this.adminRepository.findOne({
      where: {
        userName,
      },
    });

    if (!admin) {
      throw new RpcException('Người dùng không tồn tại !');
    }

    return { admin } as unknown as GetAdminByUserNameResponse;
  }
}
