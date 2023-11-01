import { GetIdAdminResponse } from '@app/proto-schema/proto/user.pb';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { AdminRepository } from '../../../users.repository';
import { GetIdAdminQuery } from '../impl';

@QueryHandler(GetIdAdminQuery)
export class GetIdAdminHandler implements IQueryHandler<GetIdAdminQuery> {
  constructor(private readonly adminRepository: AdminRepository) {}

  async execute({ cmd }: GetIdAdminQuery): Promise<GetIdAdminResponse> {
    const admin = await this.adminRepository.findOne();

    if (!admin) {
      throw new RpcException('Người dùng không tồn tại !');
    }

    return { id: admin._id } as unknown as GetIdAdminResponse;
  }
}
