import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Server } from 'socket.io';
import { Inject, Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageService } from './message.service';

@Processor('message')
@WebSocketGateway({ cors: true, port: 8000 })
export class MessageProcessor {
  constructor(
    @Inject(MessageService) private readonly messageService: MessageService,
  ) {}

  @WebSocketServer() server: Server;
  @Process('sendMessage')
  async sendMessageJob(job: Job<{ to: string; from: any; message: string }>) {
    const { to, from, message } = job.data;
    this.messageService.sendMessage({
      content: message,
      conversationId: to,
      senderId: from._id,
    });
    this.server.to(to).emit('message', { from, message });
  }
}
