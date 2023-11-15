import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import {
  AdminEntity,
  CommentEntity,
  ConfirmConversationEntity,
  ConversationEntity,
  HistoryVoucherEntity,
  MediaEntity,
  MessageEntity,
  NotificationEntity,
  OtpEntity,
  ProductEntity,
  ProductFavoriteEntity,
  SliderEntity,
  TypeEntity,
  UserEntity,
  VoucherEntity,
} from '../entities';
import { Injectable } from '@nestjs/common';
import { CartEntity, OrderEntity } from '../entities/cart';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      type: 'mongodb',
      url: this.config.get<string>('MONGODB_URI'),
      entities: [
        AdminEntity,
        OtpEntity,
        MediaEntity,
        UserEntity,
        MessageEntity,
        ConversationEntity,
        ConfirmConversationEntity,
        ProductEntity,
        OrderEntity,
        CommentEntity,
        TypeEntity,
        ProductFavoriteEntity,
        CartEntity,
        NotificationEntity,
        HistoryVoucherEntity,
        VoucherEntity,
        SliderEntity,
      ],
      useNewUrlParser: true,
      useUnifiedTopology: true,
      synchronize: true,
    };
    return options;
  }
}
