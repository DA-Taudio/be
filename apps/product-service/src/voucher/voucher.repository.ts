import { BaseRepository, HistoryVoucherEntity, VoucherEntity } from '@app/core';
import { EntityRepository } from 'typeorm';
@EntityRepository(VoucherEntity)
export class VoucherRepository extends BaseRepository<VoucherEntity> {}

@EntityRepository(HistoryVoucherEntity)
export class HistoryVoucherRepository extends BaseRepository<HistoryVoucherEntity> {}
