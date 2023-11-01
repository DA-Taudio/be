import { BaseNoSQL, Gender, Provider } from '@app/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { Media } from '../../product/type';

@ObjectType()
export class UserDtoType extends BaseNoSQL {
  @Field(() => String, { nullable: true })
  fullName: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => Provider, { nullable: true })
  provider: Provider;

  @Field(() => String, { nullable: true })
  providerId: string;

  @Field(() => Boolean, { nullable: true })
  verifyEmail: boolean;

  @Field(() => Boolean, { nullable: true })
  verifyPhone: boolean;

  @Field(() => Boolean, { nullable: true })
  verified: boolean;

  @Field(() => Boolean, { nullable: true })
  twoFactorAuthenticationSecret: boolean;

  @Field(() => Gender, { nullable: true })
  gender: Gender;

  @Field(() => Number, { nullable: true })
  birthday: number;

  @Field(() => String, { nullable: true })
  address: string;

  @Field(() => Media, { nullable: true })
  avatarId: string;

  @Field(() => Boolean, { nullable: true })
  active: boolean;
}

@ObjectType()
export class UpdateProfileResponse {
  @Field(() => Boolean)
  updated: boolean;
}

@ObjectType()
export class ChangePassWhenLoginType {
  @Field(() => Boolean)
  changed: boolean;
}

@ObjectType()
export class GetIdAdminResponse {
  @Field(() => String)
  id: string;
}

@ObjectType()
export class ListUserResponse {
  @Field(() => [UserDtoType])
  user: UserDtoType;
}
