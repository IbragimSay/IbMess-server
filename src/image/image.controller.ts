import { ImageService } from './image.service';
import { Controller, Delete, HttpStatus, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ImageDeleteResponses } from './response/ImageDeleteResponse';
import { ImageCreateResponse } from './response/ImageCreateResponse';

@Controller('image')
@ApiTags("image")
export class ImageController {
    constructor(
        private readonly imageService:ImageService
    ){}

    @ApiBearerAuth("Authorization")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor("image", {
            storage: diskStorage({
                destination: "./upload",
                filename(req, file, cb){
                    cb(null, new Date().toISOString() + ".jpg")
                }
            }) 
        })
    )
    @Post(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: ImageCreateResponse
    })
    upload(@UploadedFile() file, @Param("id") id:string){
        return this.imageService.upload(id, file.filename)
    }


    @ApiBearerAuth("Authorization")
    @Delete(":id")
    @ApiResponse({
        status: HttpStatus.OK,
        type: ImageDeleteResponses
    })
    delete(@Param("id") id:string){
        return this.imageService.delete(id)
    }
}
