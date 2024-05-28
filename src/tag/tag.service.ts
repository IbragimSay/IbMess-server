import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Global, Injectable } from '@nestjs/common';
import { tageCreateDto } from './dto';
import { Tag } from '@prisma/client';

@Injectable()
export class TagService {
    constructor(
        private readonly prismaService:PrismaService
    ){}

    async save(dto:tageCreateDto){
        const tag:Tag = await this.finOne(dto.tag)
        if(tag) return tag
        return await this.prismaService.tag.create({
            data: {
                ...dto
            }
        })
    }

    async finOne(tag: string){
        return await this.prismaService.tag.findFirst({
            where: {
                tag:tag
            }
        })
    }

    async findMany(){
        return await this.prismaService.tag.findMany()
    }

    async delete(tag:string){
        const tagFirst = await this.finOne(tag)
        if(!tagFirst){
            throw new BadRequestException()
        }
        return await this.prismaService.tag.delete({
            where: {
                tag:tag
            }
        })
    }
}

