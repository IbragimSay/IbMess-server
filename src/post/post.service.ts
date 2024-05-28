import { TagService } from './../tag/tag.service';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { createPostDto, createTagDto } from './dto';



@Injectable()
export class PostService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly tagService:TagService
    ){}
    async create(dto:createPostDto){
        return await this.prismaService.post.create({
            data:{
                title: dto.title
            }
        })
    }
    async findOne(id:string){
        const post = await this.prismaService.post.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                title: true,
                tag: true,
                articles: {
                    select: {
                        id: true,
                        text:true,
                        images: {
                            select: {
                                id: true,
                                content: true
                            }

                        }
                    }
                }
            }
        })
        if(!post){
            throw new BadRequestException()
        }
        return post
    }
    async updata(id:string, dto:createPostDto){
        const post = await this.findOne(id) 
        if(!post){
            throw new BadRequestException()
        }
        return await this.prismaService.post.update({
            where: {
                id
            },
            data: {
                ...dto
            }
        })
    }
    async delete (id:string){
        return this.prismaService.post.delete({
            where: {
                id
            },
            select: {
                id:true
            }
        })
    }

    async addTag (dto:createTagDto, id:string){
        await this.tagService.save(dto)

        return await this.prismaService.post.update({
            where: {
                id
            },
            data: {
                tag: {
                    push: dto.tag
                }
            },
            select: {
                id: true,
                title: true,
                tag: true,
                articles: {
                    select: {
                        id: true,
                        text:true,
                        images: {
                            select: {
                                id: true,
                                content: true
                            }

                        }
                    }
                }
            }
        })
    }

    async getAll(page:number, tagArr: string[]){
        if(page <= 0){
            throw new BadRequestException()
        }
        const pageSize = 12
        return this.prismaService.post.findMany({
            take: pageSize,
            skip: (page - 1) * pageSize,
            where:{
                tag: {
                    hasEvery: tagArr
                }
            },
            select: {
                id: true,
                tag: true,
                title: true,
                articles: {
                    select: {
                        id: true,
                        text:true,
                        images: {
                            select: {
                                id: true,
                                content: true
                            }
                        }
                    }
                }
            }
        })
    }
}
