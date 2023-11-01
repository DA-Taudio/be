import { ConfirmOrderHandler } from './confirm-handler';
import { CreatePaymentHandler } from './create-payment.handler';

export const PaymentCommandHandlers = [
  ConfirmOrderHandler,
  CreatePaymentHandler,
];
