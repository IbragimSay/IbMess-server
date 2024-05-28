import { TagService } from './tag.service';
import { PrismaService } from './../prisma/prisma.service';
import { Controller, Delete, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { TagResponse } from './response/TagResponse';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@Controller('tag')
export class TagController {
    constructor(
        private readonly tagService:TagService
    ){}

    @ApiBearerAuth("Authorization")
    @UseGuards(JwtAuthGuard)
    @Delete(":tag")
    @ApiResponse({
        status: HttpStatus.OK,
        type: TagResponse
    })
    delete(@Param("tag") tag:string){
        
        return this.tagService.delete(tag)
    }

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        type: [TagResponse]
    })
    getAll(){
        return this.tagService.findMany()
    }
}
