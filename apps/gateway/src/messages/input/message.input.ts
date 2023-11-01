import { ConversationType, PaginationBaseInput } from '@app/core';
import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class SendMessageInput {
  @Field(() => String)
  content: string;

  @Field(() => String)
  conversationId: string;

  @Field(() => String)
  senderId: string;
}

@InputType()
export class CreateConversationInput {
  @Field(() => String)
  name: string;

  @Field(() => ConversationType)
  type: ConversationType;
}

@InputType()
export class ListConversationInput {
  @Field(() => String)
  userId: string;
}

@InputType()
export class ListMessageInput {
  @Field(() => String)
  conversationId: string;

  @Field(() => PaginationBaseInput)
  pagination: PaginationBaseInput;
}
