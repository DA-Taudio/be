import { CreateConversationHandler } from './create-conversation.handler';
import { SendJoinGroupHandler } from './send-join-group.handler';
import { SendMessageHandler } from './send-message.handler';

export const MessageCommandHandlers = [
  CreateConversationHandler,
  SendMessageHandler,
  SendJoinGroupHandler,
];
