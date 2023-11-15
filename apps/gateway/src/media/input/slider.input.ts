import { PaginationBaseInput, SliderType } from '@app/core';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateSliderInput {
  @Field(() => String, { nullable: true })
  mediaId: string;

  @Field(() => Number, { nullable: true })
  position: number;

  @Field(() => SliderType, { nullable: true })
  type: SliderType;

  @Field(() => String, { nullable: true })
  redirectUrl: string;
}

@InputType()
export class UpdateSliderInput extends CreateSliderInput {
  @Field(() => String, { nullable: true })
  sliderId: string;
}

@InputType()
export class GetSliderInput {
  @Field(() => String, { nullable: true })
  sliderId: string;
}

@InputType()
export class DeleteSliderInput extends GetSliderInput {}

@InputType()
export class FilterSliderInput {
  @Field(() => SliderType, { nullable: true })
  type_eq: SliderType;
}

@InputType()
export class ListSliderInput {
  @Field(() => PaginationBaseInput)
  pagination: PaginationBaseInput;

  @Field(() => FilterSliderInput, { nullable: true })
  filter: FilterSliderInput;
}
