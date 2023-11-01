import { Gender, ProfileTypes, UserIsActive, UserTypes } from '@app/core/enum';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Expose, plainToClass } from 'class-transformer';
import { Entity, Column, BeforeInsert } from 'typeorm';
import { BaseNoSQLEntity } from '../base';

@Entity('user_profile')
@ObjectType()
export class ProfileEntity extends BaseNoSQLEntity {
  @Field(() => String, { description: 'display Name' })
  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  @Expose()
  displayName?: string;

  @Field(() => String, { description: 'fist Name' })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Expose()
  firstName: string;

  @Field(() => String, { description: 'last Name' })
  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  @Expose()
  lastName: string;

  @Field(() => UserTypes, { description: 'ProfileTypes' })
  @Column({
    type: 'enum',
    enum: ProfileTypes,
    default: ProfileTypes.Audience,
  })
  @Expose()
  type: ProfileTypes = ProfileTypes.Audience;

  @Field(() => UserIsActive, { description: 'UserIsActive' })
  @Column('enum', {
    enum: UserIsActive,
    default: UserIsActive.Active,
    nullable: false,
  })
  @Expose()
  isActive: UserIsActive = UserIsActive.Active;

  @Field(() => Gender, { description: 'gender' })
  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.Unknown,
  })
  @Expose()
  gender: Gender = Gender.Unknown;

  @Field(() => Int, { description: 'birthday', nullable: true })
  @Column()
  @Expose()
  birthday?: number;

  @BeforeInsert()
  setDisplayName() {
    this.displayName = `${this.firstName || ''} ${this.lastName || ''}`;
  }

  constructor(entity: Partial<ProfileEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(ProfileEntity, entity, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
