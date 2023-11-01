import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseNoSQLEntity } from '../base';

@Entity('db_message')
@ObjectType()
export class MessageEntity extends BaseNoSQLEntity {
  @Column()
  @Expose()
  @Field()
  content: string;

  @Column()
  @Expose()
  @Field()
  senderId: string;

  @Column()
  @Expose()
  @Field()
  conversationId: string;

  constructor(message: Partial<MessageEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(MessageEntity, message, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
