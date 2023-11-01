import { DetailOrderHandler } from './detail-order.handler';
import { ListOrderAdminHandler } from './list-order-admin.handler';
import { ListOrderUserHandler } from './list-order-user.handler';

export const PaymentQueryHandlers = [
  ListOrderAdminHandler,
  ListOrderUserHandler,
  DetailOrderHandler,
];
