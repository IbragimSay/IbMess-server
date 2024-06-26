import { PassportModule } from '@nestjs/passport';
import { UserService } from './../user/user.service';
import { PrismaService } from './../prisma/prisma.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import {v4} from 'uuid'
import { JwtService } from '@nestjs/jwt';
import { Token, User } from '@prisma/client';
import { add } from 'date-fns';
import { JwtPayload, Tokens } from './interface';
import { Response } from 'express';
import { loginDto, signupDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly userService:UserService,
        private readonly jwtServic:JwtService
    ){}

    async signup(dto:signupDto){
        const user = await this.userService.getUserByMailOrId(dto.mail)
        if(user){
            throw new BadRequestException()
        }
        return await this.userService.save(dto)
    }

    async login(dto:loginDto, agent:string){
        const user:User = await this.userService.getUserByMailOrId(dto.mail)
        if(!user || !compareSync(dto.password, user.password)){
            throw new UnauthorizedException()
        }
        return await this.getToken(user, agent)
    }
    async refresh (refreshToken:string, agent:string){
        if(!refreshToken){
            throw new UnauthorizedException()
        }
        const token:Token = await this.prismaService.token.findFirst({
            where: {
                token: refreshToken
            }
        })
        if(!token){
            throw new UnauthorizedException()
        }
        if(new Date(token.exp)< new Date()){
            throw new UnauthorizedException()
        }
        const user:User = await this.prismaService.user.findFirst({
            where: {
                id: token.userId
            }
        }) 
        if(!user){
            throw new UnauthorizedException()
        }
        return await this.getToken(user, agent)
    }

    private async getToken(user:User, agent:string):Promise<Tokens>{
        const accsesToken:string = "Bearer " + await this.jwtServic.signAsync({
            id: user.id,
            mail: user.mail
        })

        const refreshToken:Token = await this.getRefreshToekn(user.id, agent)
        return {accsesToken, refreshToken}
    }
    private async getRefreshToekn(id:string, agent:string):Promise<Token>{
        const _token = await this.prismaService.token.findFirst({
            where: {
                userId: id,
                userAgent: agent
            }
        })

        const token = _token?.token ?? ""
        return await this.prismaService.token.upsert({
            where: {
                token: token,
            },
            update: {
                token: v4(),
                exp: add(new Date(), {months: 1})
            },
            create: {
                token: v4(),
                exp: add(new Date(), {months: 1}),
                userId: id,
                userAgent:agent
            }
        })
    }
}
