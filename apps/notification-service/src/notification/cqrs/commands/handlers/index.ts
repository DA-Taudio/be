import { ChangeStatusReadHandler } from './change-status-read.handler';
import { CreateNotificationHandler } from './create-notification.handler';

export const NotificationCommandHandlers = [
  CreateNotificationHandler,
  ChangeStatusReadHandler,
];
