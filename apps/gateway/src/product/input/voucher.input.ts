import {
  CouponCodeValidator,
  OrderItem,
  PaginationBaseInput,
  VoucherStatus,
} from '@app/core';
import { Field, InputType } from '@nestjs/graphql';
import { ArrayMinSize, IsNotEmpty, Validate } from 'class-validator';

@InputType()
export class CreateVoucherInput {
  @Field(() => String)
  @Validate(CouponCodeValidator)
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
  @Field(() => [String], { nullable: true })
  productIds: string[];
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

@InputType()
export class ApplyVouchersInput {
  @Field(() => [String])
  @ArrayMinSize(1)
  couponCode: string[];

  @Field(() => [OrderItem], { nullable: true })
  items: OrderItem[];
}
