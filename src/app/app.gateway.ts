import { JwtPayload } from './../auth/interface';
import { Inject } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';
import jwt from "jsonwebtoken"
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';



@WebSocketGateway(5003, {
  cors: {
    origin: "*"
  }
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect{

  constructor(
    private readonly prismaService:PrismaService,
    private readonly configService:ConfigService,
    @Inject(CACHE_MANAGER) private redis: Cache
  ){}

  @WebSocketServer() server:Server
  @SubscribeMessage('message')
  handleMessage(client: any, data: {name:string, token: string}): string {

    return 'Hello world!';
  }

  async handleConnection(client: Socket, data: {token: string}) {
    const token = data.token.split(" ")[1]
    const payload:JwtPayload = jwt.verify(token, this.configService.get("JWT_SECRET")) as JwtPayload
    const user:User = await this.prismaService.user.findFirst({
      where: {
        id: payload.id,
        mail: payload.mail
      }
    }) 
    await this.redis.set(user.userName, client.id)
    console.log(client.id)
  }

  handleDisconnect(client: any) {
    console.log(client)
  }
}
