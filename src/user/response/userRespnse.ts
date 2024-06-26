import { ApiProperty } from '@nestjs/swagger';
import { User } from "@prisma/client"
import { Exclude } from "class-transformer"

export class UserResponse {
    @ApiProperty({
        default: "ai2364-f4ds-4st5-b69c-26f4c0e913b8"
    })
    id: string
    @ApiProperty({
        default: "test@mail.ru"
    })
    mail: string
    @Exclude()
    password: string
    userName: string
    constructor(user:User){
        Object.assign(this, user)
    }
}