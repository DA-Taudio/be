import { PaginationResponse } from '@app/core';
import { Field, ObjectType } from '@nestjs/graphql';
import { Double } from 'typeorm';

@ObjectType()
export class VoucherResponse {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  code: string;

  @Field(() => Number)
  percent: number;

  @Field(() => Number)
  maxDiscount: number;

  @Field(() => Number)
  quantity: number;

  @Field(() => Number)
  maxUserUse: number;

  @Field(() => [String])
  productIds: string[];

  @Field(() => Number)
  startTime: number;

  @Field(() => Number)
  endTime: number;
}

@ObjectType()
export class ListVoucherResponse {
  @Field(() => [VoucherResponse], { nullable: true })
  vouchers: VoucherResponse[];

  @Field(() => Number, { nullable: true })
  totalItem: number;

  @Field(() => PaginationResponse, { nullable: true })
  pagination: PaginationResponse;
}
@ObjectType()
export class InfoApply {
  @Field(() => String, { nullable: true })
  code: string;

  @Field(() => Number, { nullable: true })
  reducedAmount: number;

  @Field(() => String, { nullable: true })
  voucherId: string;
}

@ObjectType()
export class OrderItemType {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  image: string;

  @Field(() => Number)
  quantity: number;

  @Field(() => Number)
  price: number;
}

@ObjectType()
export class ApplyVouchersResponse {
  @Field(() => Number)
  discountAmount: number;

  @Field(() => [InfoApply])
  info: InfoApply[];

  @Field(() => Number)
  totalPayment: number;

  @Field(() => [OrderItemType])
  items: OrderItemType[];
}
