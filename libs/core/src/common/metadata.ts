import { Metadata } from '@grpc/grpc-js';
import { UserEntity } from '../entities';
import { UserTypes } from '@app/core/enum';

export interface UserMetaData {
  userId?: string;
  userType?: UserTypes;
}

export class AppMetadata {
  setUser(user: UserEntity) {
    const metadata = new Metadata();
    metadata.add('userId', user._id);
    // metadata.set('userType', user.type);
    return metadata;
  }

  setUserId(id: string) {
    const metadata = new Metadata();
    metadata.add('userId', id);
    return metadata;
  }

  getUser(metadata: Metadata): string {
    return metadata.get('userId')?.[0] as string;
  }

  getUserId(metadata: Metadata): string {
    return metadata.get('userId')?.[0] as string;
  }

  getUserInfo(metadata: Metadata): UserMetaData {
    const DEFAULT_USER_TYPE = UserTypes.Audience;
    const userId = metadata.get('userId')?.[0] as string;
    const userType = metadata.get('userType')?.[0] as UserTypes;

    return {
      userId,
      userType: userType || DEFAULT_USER_TYPE,
    };
  }

  getUserType(metadata: Metadata): UserTypes {
    const defaultUserType = UserTypes.Audience;
    return (metadata.get('userType')?.[0] || defaultUserType) as UserTypes;
  }
}
