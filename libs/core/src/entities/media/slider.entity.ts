import { Column, Entity } from 'typeorm';
import { BaseNoSQLEntity } from '../base';
import { Expose, plainToClass } from 'class-transformer';
import { SliderType } from '@app/core/enum';

@Entity({ name: 'db_slider' })
export class SliderEntity extends BaseNoSQLEntity {
  @Column({
    type: 'string',
  })
  @Expose()
  mediaId: string;

  @Column({
    type: 'number',
  })
  @Expose()
  position: number;

  @Column('enum', { enum: SliderType })
  @Expose()
  type: SliderType;

  @Column({
    type: 'string',
  })
  @Expose()
  redirectUrl: string;

  constructor(user: Partial<SliderEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(SliderEntity, user, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
