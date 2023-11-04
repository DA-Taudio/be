import { registerEnumType } from '@nestjs/graphql';

export enum VoucherStatus {
  UPCOMING = 'UPCOMING',
  EXPIRED = 'EXPIRED',
  APPLYING = 'APPLYING',
}

registerEnumType(VoucherStatus, { name: 'VoucherStatus' });
