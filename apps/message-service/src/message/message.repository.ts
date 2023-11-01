import {
  MessageEntity,
  BaseRepository,
  ConversationEntity,
  ConfirmConversationEntity,
} from '@app/core';
import { EntityRepository } from 'typeorm';
import { createHash } from 'crypto';
import base64url from 'base64url';

@EntityRepository(MessageEntity)
export class MessageRepository extends BaseRepository<MessageEntity> {}

@EntityRepository(ConversationEntity)
export class ConversationRepository extends BaseRepository<ConversationEntity> {}

@EntityRepository(ConfirmConversationEntity)
export class ConfirmConversationRepository extends BaseRepository<ConfirmConversationEntity> {}
