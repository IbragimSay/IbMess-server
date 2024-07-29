import { UserService } from 'src/user/user.service';
import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserResponse } from './response';
import { updataUserDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interface';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}
    @Get(":userName")
    @UseInterceptors(ClassSerializerInterceptor)
    async getUser(@Param("userName") userName:string){
        const user = await this.userService.getUserByUserName(userName)
        return new UserResponse(user)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @UseGuards(JwtAuthGuard)
    @Get("")
    async getUserInfoByToken(@Req() req:Request){
        const payload = req.user as JwtPayload
        const user = await this.userService.getUserByMailOrId(payload.mail)
        return new UserResponse(user)
    }

    @Patch(":id")
    async updata(@Param("id") id:string, @Body() dto:updataUserDto){
        const user = await this.userService.updata(id, dto)
        return new UserResponse(user)
    }
}
