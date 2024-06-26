import { UserService } from 'src/user/user.service';
import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, UseInterceptors } from '@nestjs/common';
import { UserResponse } from './response';
import { updataUserDto } from './dto';

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

    @Patch(":id")
    async updata(@Param("id") id:string, @Body() dto:updataUserDto){
        const user = await this.userService.updata(id, dto)
        return new UserResponse(user)
    }
}
