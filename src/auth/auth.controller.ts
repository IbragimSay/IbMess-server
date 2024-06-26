import { AuthService } from './auth.service';
import {Body, ClassSerializerInterceptor, Controller, Get, HttpStatus, Post, Res, UnauthorizedException, UseInterceptors } from '@nestjs/common';

import { UserAgent } from 'common/common/decorators';
import { Response } from 'express';
import { Tokens } from './interface';
import { Cookie } from 'common/common/decorators/cookies.decorator';
import { loginDto, signupDto } from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponse } from 'src/user/response';


const REFRESH_KEY = "refresh"

@Controller('auth')
@ApiTags("auth")
export class AuthController {

    constructor(
        private readonly authService:AuthService
    ){}

    @ApiResponse({
        status: HttpStatus.OK,
        type: UserResponse
        
    })
    @UseInterceptors(ClassSerializerInterceptor)
    @Post('signup')
    async logup(@Body() dto:signupDto){
        const user =  await this.authService.signup(dto)
        return new UserResponse(user)
    }
 

    @Post('login')
    @ApiResponse({
        status: HttpStatus.OK,
        type: Tokens
    })
    async login(@Body() dto:loginDto, @UserAgent() agent: string, @Res() res:Response){
        const tokens =  await this.authService.login(dto, agent)
        return this.setRefreshTokenToCookies(tokens, res)
    }

    @ApiResponse({
        status: HttpStatus.OK,
        type: Tokens
    })
    @Get("refresh-token")
    async refresh(@Cookie(REFRESH_KEY) refreshToken: string, @Res() res:Response, @UserAgent() agent:string){ 
        const tokens:Tokens = await this.authService.refresh(refreshToken, agent)
        return this.setRefreshTokenToCookies(tokens, res)
    }

    private setRefreshTokenToCookies(tokens:Tokens, res:Response){
        if(!tokens){
            throw new UnauthorizedException()
        }

        res.cookie(REFRESH_KEY, tokens.refreshToken.token)
        res.status(200).json(tokens)
    }
}
