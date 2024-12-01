import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  import { Injectable } from '@nestjs/common';
  
  @WebSocketGateway(3001, {
    cors: {
      origin: '*',
    },
  })
  @Injectable()
  export class WebSocketNotificationGateway
    implements OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer()
    server: Server;
  
    private users = new Map<string, string>(); 
    handleConnection(socket: Socket) {
      console.log(`Usuário conectado: ${socket.id}`);
      const userId = socket.handshake.query.userId as string;
      if (userId) {
        this.users.set(socket.id, userId);
        socket.join(userId);
      }
    }
  
    handleDisconnect(socket: Socket) {
      console.log(`Usuário desconectado: ${socket.id}`);
      this.users.delete(socket.id);
    }
  
    sendNotificationToUser(userId: string, event: NotificationEvent) {
      this.server.to(userId).emit('notification', event);
    }
  }
  