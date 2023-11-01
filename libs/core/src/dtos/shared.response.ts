import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BooleanPayload {
  @Field({ nullable: true })
  success: boolean;
}
