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
        return await this.prismaService.user.create({
            data: {
                mail: dto.mail,
                password: hashPassword
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

    private getHashPassport(pass:string){
        return hashSync(pass, 5)
    }
}
