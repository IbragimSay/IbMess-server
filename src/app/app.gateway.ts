import { UserService } from 'src/user/user.service';
import { MessageService } from './../message/message.service';
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
    private readonly messageService:MessageService,
    private readonly userService:UserService,
    @Inject(CACHE_MANAGER) private redis: Cache
  ){}

  @WebSocketServer() server:Server

  @SubscribeMessage("sendMessage")
  async hendleSendMessage(client: Socket, data: {recipientName: string, token: string, content:string}){
    const payload:JwtPayload = this.getPayload(data.token)
    const user:User = await this.userService.getUserByMailOrId(payload.id)
    const message = await this.messageService.save(data.content, user.userName, data.recipientName)
    this.server.to(client.id).emit('getMess', message)
  }

  @SubscribeMessage("login")
  async handleLogin(client: Socket, data: {token: string}) {
    const payload:JwtPayload = this.getPayload(data.token)
    const user:User = await this.userService.getUserByMailOrId(payload.id)
    const userClientId = await this.redis.get(user.userName)
    if(!userClientId){
      await this.redis.set(user.userName, client.id)
    }
    await this.redis.del(user.userName)
    await this.redis.set(user.userName, client.id)
    console.log(client.id)
  }


  handleConnection(client: Socket, ...args: any[]) {
    console.log("connect===ok" + client.id)
  }

  handleDisconnect(client: Socket) {
    console.log(client.id)
  }

  private getPayload(token:string){
    const _token = token.split(" ")[1]
    const payload:JwtPayload = jwt.verify(_token, this.configService.get("JWT_SECRET")) as JwtPayload
    return payload
  }
}
