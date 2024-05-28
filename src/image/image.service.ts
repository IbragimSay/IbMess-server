import { TagService } from './../tag/tag.service';
import { join } from 'path';
import { ArticleService } from './../article/article.service';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import {unlink} from 'fs'
@Injectable()
export class ImageService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly articleService:ArticleService,
        private readonly tagService:TagService
    ){}

    async upload(id:string, filename:string){
        const article = await this.articleService.findOne(id)
        if(!article || !filename){
            throw new BadRequestException()
        }
        return await this.prismaService.image.create({
            data: {
                content: filename,
                articleId: id
            }
        })
    }

    async delete(id:string){
        const image = await this.prismaService.image.findFirst({
            where: {
                id
            },
            select: {
                id:true
            }
        })
        if(!image){
            throw new BadRequestException()
        }
        const deleteImage =  await this.prismaService.image.delete({
            where: {
                id
            },select: {
                content: true,
                id: true
            }
        })

        unlink(join(__dirname, "..", "..", "upload", deleteImage.content ), (err)=>{
            return
        })
        return {id: deleteImage.id}


    }
}
