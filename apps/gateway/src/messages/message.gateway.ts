import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

@WebSocketGateway({ cors: true, port: 8000 })
export class MessageGateway {
  constructor(@InjectQueue('message') private readonly messagesQueue: Queue) {}

  @WebSocketServer() server: Server;

  async handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client ${client.id} connected`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: any): Promise<void> {
    const { to, from, message } = payload;
    this.messagesQueue.add('sendMessage', { to, from, message });
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, room: string) {
    console.log(`Client ${client.id} joined room ${room}`);
    client.join(room);
    client.emit('joinedRoom', room);
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(client: Socket, room: string) {
    console.log(`Client ${client.id} left room ${room}`);
    client.leave(room);
    client.emit('leftRoom', room);
  }
}
