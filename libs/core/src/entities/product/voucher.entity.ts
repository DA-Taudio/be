import { Expose, plainToClass } from 'class-transformer';
import { Column, Entity } from 'typeorm';
import { BaseNoSQLEntity } from '../base';

@Entity('db_voucher')
export class VoucherEntity extends BaseNoSQLEntity {
  @Column()
  @Expose()
  code: string;

  @Column()
  @Expose()
  percent: number;

  @Column()
  @Expose()
  maxDiscount: number;

  @Column()
  @Expose()
  quantity: number;

  @Column()
  @Expose()
  maxUserUse: number;

  @Column()
  @Expose()
  productIds: string[];

  @Column()
  @Expose()
  startTime: Date;

  @Column()
  @Expose()
  endTime: Date;

  constructor(revision: Partial<VoucherEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(VoucherEntity, revision, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
