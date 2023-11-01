import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseNoSQLEntity } from '../base';
import { ConversationType } from '@app/core/enum';

@Entity('db_conversation')
@ObjectType()
export class ConversationEntity extends BaseNoSQLEntity {
  @Column()
  @Expose()
  @Field()
  name: string;

  @Column({ default: [] })
  @Expose()
  @Field(() => [String])
  members: string[] = [];

  @Column({
    type: 'enum',
    enum: ConversationType,
    default: ConversationType.PERSONAL,
  })
  @Expose()
  @Field(() => ConversationType)
  type: ConversationType = ConversationType.PERSONAL;

  @Column()
  @Expose()
  @Field()
  ownerId?: string;

  constructor(Conversation: Partial<ConversationEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(ConversationEntity, Conversation, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
