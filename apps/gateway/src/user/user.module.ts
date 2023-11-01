import { Module } from '@nestjs/common';
import { UserResolver, UsersLoaderResolver } from './user.resolver';

@Module({
  providers: [UserResolver, UsersLoaderResolver],
})
export class UserModule {}
