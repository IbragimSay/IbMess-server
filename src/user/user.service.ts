import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService:PrismaService
    ){}

    async save(dto: createUserDto){
        const hashPassword = this.getHashPassport(dto.password)

        let userName:string
        let _userName
        do{
            userName = this.generateUserName()
            _userName = await this.getUserByUserName(userName)
        }while(_userName)
        return await this.prismaService.user.create({
            data: {
                mail: dto.mail,
                password: hashPassword,
                userName,
                lastName: dto.lastName,
                firstName: dto.firstName
            }
        })
    }

    async getUserByUserName(userName: string){
        return await this.prismaService.user.findFirst({
            where: {
                userName
            }
        })
    }

    async findOne(idOrMail:string){
        return await this.prismaService.user.findFirst({
            where: {
                OR: [
                    {id: idOrMail},
                    {mail: idOrMail}
                ]
            }
        })
    }

    shifr = [
        "A", "a", "Q", "q", "W", "w", "E", "e", "R", "r", "T", "t", "Y", "y", "U", "u", "I", "i", "O", "o", 
        "P", "p", "S", "s","D", "F", "f", "G", "H", "h", "J", "K", "L", "l", "Z", "z", "X", "x", "C", "c",
         "V", "v", "B", "b", "N", "n", "M", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"
    ]

    private generateUserName():string{
        let i = 0
        let userName = 'us='
        while(i < 7){
            userName= userName + this.shifr[this.getRandom()]
            i++
        }
        return userName
    }

    private getRandom(){
        return Math.floor(Math.random() * 57)
    }

    private getHashPassport(pass:string){
        return hashSync(pass, 5)
    }
}
