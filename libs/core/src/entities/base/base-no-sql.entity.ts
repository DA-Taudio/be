import { convertToObjectId } from '@app/utils';
import { Field, ObjectType } from '@nestjs/graphql';
import { Expose, Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class BaseNoSQLEntity {
  @Field()
  @ObjectIdColumn()
  _id: string;

  @Field(() => String, { nullable: true })
  @Expose()
  @Column()
  // @Transform(({ value }) => convertToObjectId(value))
  createdBy?: string;

  @Field(() => String, { nullable: true })
  @Expose()
  @Column()
  @Transform(({ value }) => convertToObjectId(value))
  updatedBy?: string;

  @Field(() => String, { nullable: true })
  @Expose()
  @Column()
  @Transform(({ value }) => convertToObjectId(value))
  deletedBy?: string;

  @Field(() => Date, { nullable: true })
  @Expose()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @Field(() => Date)
  @Expose()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @Field(() => Date)
  @Expose()
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;
}
