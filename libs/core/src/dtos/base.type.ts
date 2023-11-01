import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseNoSQL {
  @Field(() => Number, { nullable: true })
  createdAt: number;

  @Field(() => String, { nullable: true })
  createdBy: string;

  @Field(() => String, { nullable: true })
  updatedBy: string;

  @Field(() => String, { nullable: true })
  deletedBy: string;

  @Field(() => Number, { nullable: true })
  deletedAt: number;

  @Field(() => Number, { nullable: true })
  updatedAt: number;

  @Field(() => ID, { nullable: true })
  _id: string;
}
