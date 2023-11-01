import { ConfirmationStatus } from '@app/core/enum';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseNoSQLEntity } from '../base';

@Entity('db_confirm_conversation')
@ObjectType()
export class ConfirmConversationEntity extends BaseNoSQLEntity {
  @Column()
  @Expose()
  @Field()
  userId: string;

  @Column()
  @Expose()
  @Field()
  conversationId?: string;

  @Column({
    type: 'enum',
    enum: ConfirmationStatus,
    default: ConfirmationStatus.PENDING,
  })
  @Expose()
  @Field(() => ConfirmationStatus)
  status: ConfirmationStatus = ConfirmationStatus.PENDING;

  constructor(ConfirmConversation: Partial<ConfirmConversationEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(ConfirmConversationEntity, ConfirmConversation, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
