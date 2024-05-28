import { PostService } from 'src/post/post.service';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, Delete, BadRequestException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly postService:PostService
    ){}

    async save(dto:CreateArticleDto, id:string){
        const post = await this.postService.findOne(id)
        if(!post){
            throw new BadRequestException()
        }
        if(!dto.text){
            dto.text = null
        }
        return await this.prismaService.article.create({
            data: {
                ...dto,
                postId: id
            }
        })
    }
    
    async findOne(id:string){
        return await this.prismaService.article.findFirst({
            where: {
                id
            }
        })
    }

    async delete (id:string){
        const article = await this.findOne(id)
        if(!article){
            throw new BadRequestException()
        }
        return await this.prismaService.article.delete({
            where: {
                id
            },
            select: {
                id:true
            }
        })
    }

    async updata (dto:CreateArticleDto, id:string){
        const article = await this.findOne(id)
        if(!article){
            throw new BadRequestException()
        }
        return await this.prismaService.article.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }

}
