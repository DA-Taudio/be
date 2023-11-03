import { Column, Entity } from 'typeorm';
import { BaseNoSQLEntity } from '@app/core/entities/base';
import { Expose, plainToClass } from 'class-transformer';

@Entity('db_history_voucher')
export class HistoryVoucherEntity extends BaseNoSQLEntity {
  @Column()
  @Expose()
  voucherId: string;

  @Column()
  @Expose()
  userId: string;

  @Column()
  @Expose()
  orderId: string;

  @Column()
  @Expose()
  reducedAmount: number;

  constructor(banner: Partial<HistoryVoucherEntity>) {
    super();
    Object.assign(
      this,
      plainToClass(HistoryVoucherEntity, banner, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true,
        exposeUnsetFields: false,
      }),
    );
  }
}
