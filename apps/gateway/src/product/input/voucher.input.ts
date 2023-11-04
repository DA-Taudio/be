import { PaginationBaseInput, VoucherStatus } from '@app/core';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateVoucherInput {
  @Field(() => String)
  @IsNotEmpty()
  code: string;

  @Field(() => Number)
  @IsNotEmpty()
  percent: number;

  @Field(() => Number)
  @IsNotEmpty()
  maxDiscount: number;

  @Field(() => Number)
  @IsNotEmpty()
  quantity: number;

  @Field(() => Number)
  @IsNotEmpty()
  maxUserUse: number;

  @Field(() => [String])
  @IsNotEmpty()
  productIds: string[];

  @Field(() => String)
  @IsNotEmpty()
  startTime: string;

  @Field(() => String)
  @IsNotEmpty()
  endTime: string;
}

@InputType()
export class UpdateVoucherInput extends CreateVoucherInput {
  @Field(() => String)
  @IsNotEmpty()
  _id: string;
}

@InputType()
export class ReadVoucherInput {
  @Field(() => String)
  @IsNotEmpty()
  _id: string;
}

@InputType()
export class FilterVoucherInput {
  @Field(() => VoucherStatus, { nullable: true })
  status_eq: VoucherStatus;
}

@InputType()
export class ListVoucherInput {
  @Field(() => PaginationBaseInput)
  pagination: PaginationBaseInput;

  @Field(() => FilterVoucherInput, { nullable: true })
  filter: FilterVoucherInput;

  @Field(() => String, { nullable: true })
  query: string;
}
