import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { createPostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostCreateResponse, PostDeleteResponse, PostGetOneResponse } from './response';
import { createTagDto } from './dto';



@Controller('post')
@ApiTags("post")
export class PostController {
    constructor (
        private readonly postService:PostService
    ){}
    
    @ApiBearerAuth("Authorization")
    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiResponse({
        status: HttpStatus.OK,
        type: PostCreateResponse
    })
    async create(@Body() dto:createPostDto){
        return this.postService.create(dto)
    }

    @Get(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: PostGetOneResponse
    })
    findOne(@Param("id") id:string){
        return this.postService.findOne(id)
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(JwtAuthGuard)
    @Patch(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: PostCreateResponse
    })
    updata(@Param("id") id:string,@Body() dto:createPostDto){
        return this.postService.updata(id, dto)
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: PostDeleteResponse
    })
    delete(@Param("id") id:string){
        return this.postService.delete(id)
    }

    @Get("page/:page/by-tags")
    @ApiResponse({
        status: HttpStatus.OK,
        type: [PostGetOneResponse]
    })
    getAll(@Param("page") page: number, @Query('tag') tag: string){
        if(!tag){
            return this.postService.getAll(page, [])
        }
        const tagArr = tag.split(',')
        return this.postService.getAll(page, tagArr)
    }

    @ApiBearerAuth("Authorization")
    @UseGuards(JwtAuthGuard)
    @Post("tag/:id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: PostGetOneResponse
    })
    async addTag(@Body() dto:createTagDto, @Param("id") id:string){
        return this.postService.addTag(dto, id) 
    }
}
