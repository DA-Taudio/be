import { getCurrentTimestamp } from '@app/utils/time';
import { Field } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ObjectIdColumn,
} from 'typeorm';

@Entity('notification')
export class NotificationEntity {
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Field(() => String, { nullable: true })
  @Column()
  @Expose()
  senderId?: string;

  @Column()
  @Expose()
  receiverId: string[];

  @Field(() => String)
  @Column()
  @Expose()
  referenceId: string;

  @Field(() => String)
  @Column()
  @Expose()
  content: string;

  @Field(() => Boolean)
  @Column({ default: false })
  @Expose()
  isRead: boolean;

  @Field(() => Number, { defaultValue: getCurrentTimestamp(), nullable: true })
  @Expose()
  @Column()
  createdAt?: number;

  @Field(() => Number, { defaultValue: getCurrentTimestamp(), nullable: true })
  @Column()
  @Expose()
  updatedAt?: number;

  @BeforeUpdate()
  onUpdate() {
    this.updatedAt = getCurrentTimestamp();
  }

  @BeforeInsert()
  onInsert() {
    this.createdAt = getCurrentTimestamp();
  }

  constructor(notification: Partial<NotificationEntity>) {
    //super();
    Object.assign(
      this,
      plainToClass(NotificationEntity, notification, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
