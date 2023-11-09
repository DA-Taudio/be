import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {
  // CartTypeResolver,
  ListProductByIdsResolver,
  ListProductResolver,
  OrderDtoResolver,
  ProductResolver,
} from './product.resolver';
import { ProductService } from './product.service';
import { PubSubModule } from '@app/core';
import { CommentResolver } from './comment.resolver';
import { CommentService } from './comment.service';
import { TypeResolver } from './type.resolver';
import { VoucherResolver } from './voucher.resolver';

@Module({
  imports: [PubSubModule],
  providers: [
    ProductResolver,
    ProductService,
    CommentResolver,
    CommentService,
    ListProductResolver,
    TypeResolver,
    ListProductByIdsResolver,
    OrderDtoResolver,
    VoucherResolver,
    // CartTypeResolver,
  ],
})
export class ProductModule {}
