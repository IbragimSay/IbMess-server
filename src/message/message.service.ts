import { User } from '@prisma/client';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
    constructor(
        private readonly prismaService:PrismaService
    ){}

    async getChatByUserName(myUserName:string, notMyUserName:string){
        return await this.prismaService.message.findMany({
            where: {
                OR:[
                    {recipientName: myUserName, senderName: notMyUserName},
                    {recipientName: notMyUserName, senderName: myUserName}
                ]
            }
        })
    }

    async delete(user:User, id:number){
        return await this.prismaService.message.delete({
            where: {
                id,
                senderName: user.userName
            }
        })
    }

    async save(content:string, senderName:string, recipientName:string){
        return this.prismaService.message.create({
            data: {
                content,
                senderName,
                recipientName
            }
        })
    }

}
