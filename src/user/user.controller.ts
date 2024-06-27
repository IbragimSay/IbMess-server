import { UserService } from 'src/user/user.service';
import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserResponse } from './response';
import { updataUserDto } from './dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService:UserService
    ){}
    @Get(":userName")
    @UseInterceptors(ClassSerializerInterceptor)
    async getUser(@Param("userName") userName:string){
        const user = await this.userService.getUserByUserName(userName)
        if(!user){
            throw new BadRequestException()
        }
        return new UserResponse(user)
    }

    @UseGuards(JwtAuthGuard)
    @Get("")
    async getAll(){
        return this.userService.getAll()
    }

    @Patch(":id")
    async updata(@Param("id") id:string, @Body() dto:updataUserDto){
        const user = await this.userService.updata(id, dto)
        return new UserResponse(user)
    }
}
