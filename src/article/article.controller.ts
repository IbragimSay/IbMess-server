import { ArticleService } from './article.service';
import { Body, Controller, Param, Patch, Post, Delete, HttpStatus } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArticleCreateResponse, ArticleDeleteRespons } from './response';

@Controller('article')
@ApiTags('article')
export class ArticleController {

    constructor(
        private readonly articleService:ArticleService
    ){}

    @ApiBearerAuth("Authorization")
    @Post(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: ArticleCreateResponse
    })
    async save(@Body() dto:CreateArticleDto, @Param("id") id:string ){
        return await this.articleService.save(dto, id)
    }

    @ApiBearerAuth("Authorization")
    @Delete(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: ArticleDeleteRespons
    })
    delete(@Param("id") id:string){
        return this.articleService.delete(id)
    }

    @ApiBearerAuth("Authorization")
    @Patch(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: ArticleCreateResponse
    })
    updata(@Body() dto:CreateArticleDto, @Param("id") id:string){
        return this.articleService.updata(dto, id)
    }
}
