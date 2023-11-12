import { ApplyVouchersHandler } from './apply-vouchers.handler';
import { CreateHistoryVoucherHandler } from './create-history-voucher.handler';
import { CreateVoucherHandler } from './create-voucher.handler';
import { DeleteHistoryVoucherHandler } from './delete-history-voucher.handler';
import { DeleteVoucherHandler } from './delete-voucher.handler';
import { UpdateVoucherHandler } from './update-voucher.handler';

export const VoucherCommandHandlers = [
  CreateVoucherHandler,
  UpdateVoucherHandler,
  DeleteVoucherHandler,
  ApplyVouchersHandler,
  CreateHistoryVoucherHandler,
  DeleteHistoryVoucherHandler,
];
