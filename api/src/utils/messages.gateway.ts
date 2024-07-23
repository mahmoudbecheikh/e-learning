import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from '../module/message/message.service';
import { CreateMessageDto } from 'src/module/message/dto/create-message.dto';

@WebSocketGateway({
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })export class MessagesGateway {
    @WebSocketServer()
    server: Server;

    constructor(private readonly messageService: MessageService) { }

    @SubscribeMessage('newMessage')
    async handleNewMessage(@MessageBody() payload: CreateMessageDto, @ConnectedSocket() client: Socket): Promise<void> {
        const message = await this.messageService.create(payload);
        this.server.emit('newMessage', message);
    }
}
