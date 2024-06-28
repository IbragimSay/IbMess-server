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
