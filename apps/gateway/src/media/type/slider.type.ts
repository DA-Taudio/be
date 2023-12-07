import { PaginationResponse, SliderType } from '@app/core';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SliderResponse {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  mediaId: string;

  @Field(() => Number)
  position: number;

  @Field(() => SliderType)
  type: SliderType;

  @Field(() => String, { nullable: true })
  redirectUrl: string;
}

@ObjectType()
export class ListSliderResponse {
  @Field(() => [SliderResponse], { nullable: true })
  sliders: SliderResponse[];

  @Field(() => Number, { nullable: true })
  totalItem: number;

  @Field(() => PaginationResponse, { nullable: true })
  pagination: PaginationResponse;
}
